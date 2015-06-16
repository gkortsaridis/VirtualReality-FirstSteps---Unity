using UnityEngine;
using System.Collections;
using System.Runtime.InteropServices;
using System.IO;
using System;



//Dive Head Tracking 
// copyright by Shoogee GmbH & Co. KG Refer to LICENCE.txt 
// Changed by George Kortsaridis


//[ExecuteInEditMode]
public class OpenDiveSensor : MonoBehaviour {

	// mouse emulation
	public enum RotationAxes { MouseXAndY = 0, MouseX = 1, MouseY = 2 , MainMenu = 3 , NoMovement = 4}
	public RotationAxes axes = RotationAxes.MouseXAndY;
	public Texture nogyrotexture;

	/// Offset projection for 2 cameras in VR
	private float offset =0.0f;
	private float max_offset=0.002f;
	public Camera cameraleft;
	public Camera cameraright;
	
	public float zoom=0.1f;
	private float IPDCorrection=0.0f;
	private float aspectRatio;
	public float znear=0.1f;
	public float zfar=10000.0f;

	//My Variables
	public GUIText debug;
	public GameObject pictures;
	public bool zoomIsAllowed = false;
	private float lookOffsetRight;
	private float lookOffsetLeft;
	private float dl;

	//Rest Variable
	private float time_since_last_fullscreen=0;
	AndroidJavaObject mConfig;
	AndroidJavaObject mWindowManager;
	private float q0,q1,q2,q3;
	private float m0,m1,m2;
	Quaternion rot;
	private bool show_gyro_error_message=false;
	string errormessage;


	#if UNITY_EDITOR
		private float sensitivityX = 15F;
		private float sensitivityY = 15F;
		private float minimumX = -360F;
		private float maximumX = 360F;
		private float minimumY = -90F;
		private float maximumY = 90F;
		float rotationY = 0F;
	#elif UNITY_ANDROID
		private static AndroidJavaClass javadivepluginclass;
		private static AndroidJavaClass javaunityplayerclass;
		private static AndroidJavaObject currentactivity;
		private static AndroidJavaObject javadiveplugininstance;

		[DllImport("divesensor")]	private static extern void initialize_sensors();
		[DllImport("divesensor")]	private static extern int get_q(ref float q0,ref float q1,ref float q2,ref float q3);
		[DllImport("divesensor")]	private static extern int get_m(ref float m0,ref float m1,ref float m2);
		[DllImport("divesensor")]	private static extern int get_error();
		[DllImport("divesensor")]   private static extern void dive_command(string command);
   	#elif UNITY_IPHONE
		[DllImport("__Internal")]	private static extern void initialize_sensors();
		[DllImport("__Internal")]	private static extern float get_q0();
		[DllImport("__Internal")]	private static extern float get_q1();
		[DllImport("__Internal")]	private static extern float get_q2();
		[DllImport("__Internal")]	private static extern float get_q3();
		[DllImport("__Internal")]	private static extern void DiveUpdateGyroData();
	    [DllImport("__Internal")]	private static extern int get_q(ref float q0,ref float q1,ref float q2,ref float q3);
	#endif 	


	public static void divecommand(string command)
	{
		#if UNITY_EDITOR
		#elif UNITY_ANDROID
			dive_command(command);
		#elif UNITY_IPHONE
		#endif

	}

	public static void setFullscreen()
	{
		#if UNITY_EDITOR	
		#elif UNITY_ANDROID
			String answer;
			answer= javadiveplugininstance.Call<string>("setFullscreen");
		#elif UNITY_IPHONE
		#endif 	
		
		return;
	}





	void Start()
	{
		rot=Quaternion.identity;
	    // Disable screen dimming
     	Screen.sleepTimeout = SleepTimeout.NeverSleep;
		Application.targetFrameRate = 60;
		lookOffsetRight = 0.3f;
		lookOffsetLeft = -0.3f;
		dl = lookOffsetRight - lookOffsetLeft;


		#if UNITY_EDITOR

			if (rigidbody)
				rigidbody.freezeRotation = true;
		#elif UNITY_ANDROID

			// Java part
			javadivepluginclass = new AndroidJavaClass("com.shoogee.divejava.divejava") ;
			javaunityplayerclass= new AndroidJavaClass("com.unity3d.player.UnityPlayer");
			currentactivity = javaunityplayerclass.GetStatic<AndroidJavaObject>("currentActivity");
			javadiveplugininstance = javadivepluginclass.CallStatic<AndroidJavaObject>("instance");
			object[] args={currentactivity};
			javadiveplugininstance.Call<string>("set_activity",args);
	
			initialize_sensors ();
			
			String answer;
			answer= javadiveplugininstance.Call<string>("initializeDive");
			answer= javadiveplugininstance.Call<string>("getDeviceType");
			answer= javadiveplugininstance.Call<string>("setFullscreen");

			show_gyro_error_message=true;
			Network.logLevel = NetworkLogLevel.Full;


			int err = get_error();
			if (err==0){ errormessage="";
				show_gyro_error_message=false;

			}
			if (err==1){
				show_gyro_error_message=true;
				errormessage="ERROR: Dive needs a Gyroscope and your telephone has none, we are trying to go to Accelerometer compatibility mode. Dont expect too much.";
			}



		#elif UNITY_IPHONE
			initialize_sensors();
		#endif

		float tabletcorrection=-0.028f;
		IPDCorrection=IPDCorrection;
		//setIPDCorrection(IPDCorrection); 

	}


	
	void Update()
	{
		aspectRatio=(Screen.height*2.0f)/Screen.width;
		setIPDCorrection(IPDCorrection); 


		#if UNITY_EDITOR

		if(zoomIsAllowed)
		{
			//Zoom In
			if(Input.GetKeyDown(KeyCode.RightArrow))
				if(zoom > 0.05)  zoom -= 0.002f;

			//Zoom Out
			if(Input.GetKeyDown(KeyCode.LeftArrow))
				if(zoom < 0.096) zoom += 0.002f;
		}


		#elif UNITY_ANDROID
			time_since_last_fullscreen+=Time.deltaTime;
			
			if (time_since_last_fullscreen >8){
				setFullscreen ();
				time_since_last_fullscreen=0;

				
			}

			if(zoomIsAllowed)
			{ 
				//Zoom In
				if(Input.acceleration.x <= -0.4)
				{
					if(zoom < 0.096) zoom += 0.002f;
				}
			
				//Zoom Out
				if(Input.acceleration.x >= 0.4)
				{
					if(zoom > 0.04)  zoom -= 0.002f;
				}
			}


			get_q(ref q0,ref q1,ref q2,ref q3);
			//get_m(ref m0,ref m1,ref m2);
			
			if (axes == RotationAxes.MouseXAndY)
			{
				//Pairno tis times ton sensors
				rot.x=-q2; //pano kato
				rot.y=q3;  //deksia aristera
				rot.z=-q1;	//rotation aristera deksia
				rot.w=q0;
				//Allazo to rotation tou antikeimenou
				transform.rotation = rot;
			}
			else if (axes == RotationAxes.MouseX)
			{
				rot.x=0;
				rot.y=q3; 
				rot.z=0;
				rot.w=q0;
				//Allazo to rotation tou antikeimenou
				transform.rotation = rot;
			}
			else if (axes == RotationAxes.MouseY)
			{
				rot.x=-q2;
				rot.y=0;  
				rot.z=0;
				rot.w=q0;
				//Allazo to rotation tou antikeimenou
				transform.rotation = rot;
			}
			else if (axes == RotationAxes.MainMenu)
			{
				rot.x=-q2;
				rot.y=q3;  
				rot.z=-q1;
				rot.w=q0;
			}
			else
			{
				//I am on NoMovement
			}

			
			//Sto debug emfanizo auta pou thelo
			//debug.text = ""+Input.acceleration.x+" "+Input.acceleration.y+" "+Input.acceleration.z;

		#elif UNITY_IPHONE
			DiveUpdateGyroData();
			get_q(ref q0,ref q1,ref q2,ref q3);
			rot.x=-q2;
			rot.y=q3;
			rot.z=-q1;
			rot.w=q0;
			transform.rotation = rot;
		#endif


	


		#if UNITY_EDITOR
			if (axes == RotationAxes.MouseXAndY)
				{
					float rotationX = transform.localEulerAngles.y + Input.GetAxis("Mouse X") * sensitivityX;
					
					rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
					rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
					
					transform.localEulerAngles = new Vector3(-rotationY, rotationX, 0);
				}
				else if (axes == RotationAxes.MouseX)
				{
					transform.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
				}
				else if (axes == RotationAxes.MouseY)
				{
					rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
					rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
					
					transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, 0);
				}
				else if (axes == RotationAxes.MainMenu)
				{
					//if(Input.GetKeyDown(KeyCode.RightArrow)) pictures.transform.position += new Vector3(-3,0,0);
					//else if(Input.GetKeyDown(KeyCode.LeftArrow)) pictures.transform.position += new Vector3(3,0,0);
				}
		#endif



	}
	
	void OnGUI ()
	{
		if (show_gyro_error_message)
		{
			if(GUI.Button(new Rect(0,0, Screen.width, Screen.height) , "Error: \n\n No Gyro detected \n \n Touch screen to continue anyway"))
			{
				show_gyro_error_message=false;
			}

			GUI.DrawTexture(new Rect(Screen.width/2-320, Screen.height/2-240, 640, 480), nogyrotexture, ScaleMode.ScaleToFit, true, 0);
			return;

		}
	}




	void setIPDCorrection(float correction)
	{
		// not using camera nearclipplane value because that leads to problems with field of view in different projects
		cameraleft.projectionMatrix = PerspectiveOffCenter((-zoom+correction)*(znear/0.1f), (zoom+correction)*(znear/0.1f), -zoom*(znear/0.1f)*aspectRatio, zoom*(znear/0.1f)*aspectRatio, znear, zfar);;
		cameraright.projectionMatrix = PerspectiveOffCenter((-zoom-correction)*(znear/0.1f), (zoom-correction)*(znear/0.1f), -zoom*(znear/0.1f)*aspectRatio, zoom*(znear/0.1f)*aspectRatio, znear, zfar);;
	}
	
	static Matrix4x4 PerspectiveOffCenter(float left, float right, float bottom, float top, float near, float far)
	{
		float x = 2.0F * near / (right - left);
		float y = 2.0F * near / (top - bottom);
		float a = (right + left) / (right - left);
		float b = (top + bottom) / (top - bottom);
		float c = -(far + near) / (far - near);
		float d = -(2.0F * far * near) / (far - near);
		float e = -1.0F;
		Matrix4x4 m = new Matrix4x4();
		m[0, 0] = x;
		m[0, 1] = 0;
		m[0, 2] = a;
		m[0, 3] = 0;
		m[1, 0] = 0;
		m[1, 1] = y;
		m[1, 2] = b;
		m[1, 3] = 0;
		m[2, 0] = 0;
		m[2, 1] = 0;
		m[2, 2] = c;
		m[2, 3] = d;
		m[3, 0] = 0;
		m[3, 1] = 0;
		m[3, 2] = e;
		m[3, 3] = 0;
		return m;
	}
	
}
