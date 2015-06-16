//
//  YouTubeViewUnity.m
//  YouTubePlayer
//
//  Created by Gerard Allan on 15/03/2013.
//  Copyright (c) 2013 Gerard Allan. All rights reserved.
//

#import "YouTubePlayerView.h"
extern UIView*             UnityGetGLView();

static YouTubePlayerView *youTubeView=nil; // can only be one
static NSDictionary *youTubeData=nil;

void UnitySendMessage( const char * obj, const char * method, const char * msg );
enum {
    cStatePlayerUnstarted= -1,
    cStatePlayerEnded= 0,
    cStatePlayerPlaying= 1,
    cStatePlayerPaused=2,
    cStatePlayerBuffering=3,
    cStatePlayerCued= 5
};

@interface YouTubeViewUnity: NSObject <YouTubePlayerDelegate> 
  
// State
@property (nonatomic, assign) BOOL isPaused;
@property (nonatomic, assign) BOOL isPlay;
@property (nonatomic, assign) BOOL useControls;

@end

@implementation YouTubeViewUnity

@synthesize isPaused, isPlay;

- (id) init
{
    self = [super init];
    if (self) {
 //       NSLog(@"Init youtube");
        self.useControls=false;
        CGRect frame=CGRectMake(0,0,10,10);
        youTubeView = [[YouTubePlayerView alloc] initWithFrame:frame];
        youTubeView.playerDelegate = self;
        isPlay=false;
        isPaused=false;
        
    }
    return self;
}

#pragma mark YouTubePlayerDelegate Methods

- (void)webViewDidFinishLoad:(UIWebView *)_webView
{
    UnitySendMessage("iOSYouTube", "webViewDidFinishLoad", "YouTube");
}

-(void) playerReady {
    isPlay=false;
//    NSLog(@"Ready");
    UnitySendMessage("iOSYouTube", "youTubePlayerReady", "YouTube");
    youTubeView.hidden=NO;
}



// Callback from Data -- use data to set frame size
-(void) responseDateForVideoID:(NSString *) vidID response:(NSDictionary *) json {
 //     NSLog(@"vid %@ dict%@",vidID, json);
   
    if(json) {
        if(youTubeData) [youTubeData release];
        youTubeData = json;
        [youTubeData retain];
        UnitySendMessage("iOSYouTube", "youTubeVideoDataReady", vidID.UTF8String);
        return;
    } else {
        // Make page for error message
        NSLog(@"Error msg %@",@"json null");
        CGRect frame=youTubeView.frame;
        frame.size.width=200;frame.size.height=200;
        youTubeView.frame=frame;
    }
    // controls -- and defaults
    [youTubeView setYouTubeVideo:vidID
                    playerParams:[NSString stringWithFormat:@"'autoplay':0,'rel':0,'showinfo':0,'egm':0,'showsearch':0,'controls':%d,modestbranding:1,",(int)self.useControls]];
    
}

//Callback when player has an error
-(void) playerError:(NSString *) err {
    NSLog(@"Error msg %@",err);
    UnitySendMessage("iOSYouTube", "youTubePlayerError", err.UTF8String);
}

//-1 (unstarted) 0 (ended) 1 (playing) 2 (paused) 3 (buffering) 5 (video cued).
-(void) playerStateChange: (int) state {
    
    NSLog(@"state %d",state);
    switch(state) {
        case cStatePlayerUnstarted:
            isPlay=false;
            isPaused=false;
        break;
        case cStatePlayerPlaying: 
            isPlay=true;
            isPaused=false;
            break;
        case cStatePlayerPaused:
            isPaused=true;
            break;
        case cStatePlayerEnded:
            isPlay=false;
            isPaused=false;
            break;
        case cStatePlayerCued:
        default:
            break;
    }
    NSString *myState=[NSString stringWithFormat:@"%d",state];
    UnitySendMessage("iOSYouTube", "youTubePlayerStateChange", [myState UTF8String]);
    return;
}


-(void) didEnterFullscreen {
    NSLog(@"didEnterFullscreen");
    UnitySendMessage("iOSYouTube", "youTubeDidEnterFullscreen", "YouTube");
}

-(void) willExitFullscreen {
    NSLog(@"willExitFullscreen");
    UnitySendMessage("iOSYouTube", "youTubeWillExitFullscreen", "YouTube");
}

-(void) didExitFullscreen {
    NSLog(@"didExitFullscreen");
    UnitySendMessage("iOSYouTube", "youTubeDidExitFullscreen", "YouTube");
}

-(void) dealloc {
    [youTubeView setDelegate:nil];
    [youTubeView stopVideo];
    [youTubeView removeFromSuperview];
    [youTubeView release];
    youTubeView = nil;
    [super dealloc];
}

@end

YouTubeViewUnity *youTubeViewDelegate=nil;

extern "C" void iOSYouTubeInit() {
    if(!youTubeView) {
        youTubeViewDelegate = [[YouTubeViewUnity alloc] init];
    }
}

extern "C" void iOSYouTubeInitWithControls() {
    if(!youTubeView) {
        youTubeViewDelegate = [[YouTubeViewUnity alloc] init];
        youTubeViewDelegate.useControls=YES;
    }
}

extern "C"  void iOSYouTubePosition(float x,float y) {
    CGRect frame=youTubeView.frame;
    frame.origin.x=x;frame.origin.y=y;
    youTubeView.frame=frame;
}

extern "C" void iOSYouTubeRelease() {
    youTubeView.playerDelegate=nil;
    [youTubeViewDelegate release];
    youTubeViewDelegate=nil;
}

extern "C" void iOSsetYouTubePlayerFrame(float x, float y, float width, float height) {
    youTubeView.frame=CGRectMake(x,y,width,height);
}

extern "C" void iOSsetYouTubeVideoWithPlayerParameters(char *vidID, char *params)
{
    NSString *name = [NSString stringWithFormat:@"%s",vidID];
    if(params == nil) {
        [youTubeView setYouTubeVideo:name];
    } else {
        [youTubeView setYouTubeVideo:name
                        playerParams:[NSString stringWithFormat:@"%s",params]];
    }
         
// controls -- and defaults
//[youTubeView setYouTubeVideo:vidID
//                playerParams:[NSString stringWithFormat:@"'autoplay':0,'rel':0,'showinfo':0,'egm':0,'showsearch':0,'controls':%d,modestbranding:1,",(int)self.useControls]];
    
}

extern "C" void iOSrequestDataForVideoID(char *vidID) {
    NSString *name = [NSString stringWithFormat:@"%s",vidID];
    [youTubeView dataForVideoID:name];// will return data to callback responseDateForVideoID
}

extern "C" void iOSplayVideo() {
    [youTubeView playVideo];
}

extern "C" void iOSpauseVideo() {
    [youTubeView pauseVideo];
}

extern "C" void iOSresumeVideo() {
    [youTubeView playVideo];
}

extern "C" float iOSgetFloatForKey(char *key ){
    NSString *name = [NSString stringWithFormat:@"%s",key];
    NSNumber* nsval = [youTubeData objectForKey:name];
    return [nsval floatValue];
}

extern "C" const char *iOSgetDataForKey(char *key ){
    NSString *name = [NSString stringWithFormat:@"%s",key];
    NSString *data =  [youTubeData objectForKey:name];
    return data.UTF8String;
}


extern "C" void iOSplayNewVideo(char *str) {
    NSString *name = [NSString stringWithFormat:@"%s",str];
    [youTubeView loadVideoById:name startSeconds:0.0f suggestedQuality:nil];
}

extern "C" void iOScueVideoById(char *str, float start) {
    NSString *name = [NSString stringWithFormat:@"%s",str];
    [youTubeView cueVideoById:name startSeconds:start suggestedQuality:nil];
}

extern "C" void iOSloadVideoById(char *str, float start) {
    NSString *name = [NSString stringWithFormat:@"%s",str];
    [youTubeView loadVideoById:name startSeconds:start suggestedQuality:nil];
}


extern "C" void iOSplaySliderDidEndSliding(float value) {
    [youTubeView seekTo:value*[youTubeView getDuration] allowSeekAhead:true];
}

extern "C" void iOSplaySliderDrag(float value) {
    // if dragging wait till finish before seeking more data
    [youTubeView seekTo:value*[youTubeView getDuration] allowSeekAhead:false];
}

extern "C" float iOSgetCurrentTime() {
    return [youTubeView getCurrentTime];
}

extern "C" float iOSgetDuration() {
    return [youTubeView getDuration];
}

extern "C" float iOSgetVideoLoadedFraction(){
    return [youTubeView getVideoLoadedFraction];
}


