//
//  UnityYouTubePlayerView.h
//  Unity-iPhone
//
//  Created by Gerard Allan on 14/03/2013.
//  Copyright (c) 2013 Gerard Allan. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol YouTubePlayerDelegate <NSObject> 

//Callback when playerStateChanges. Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
-(void) playerStateChange: (int) state;

//Callback when player ready to start playing
-(void) playerReady;

//Callback when player has an error
-(void) playerError:(NSString *) err;

@optional

//Callbacks when player is entering/leaving fullscreen mode
-(void) didEnterFullscreen;
-(void) willExitFullscreen;
-(void) didExitFullscreen;

//Callback when player webpage loaded -- note is called twice - -once for script once for page!!!
- (void)webViewDidFinishLoad:(UIWebView *)_webView;

// Gives data on vidID eg.
/*
//{
//    "author_name" = OTMTeam;
//    "author_url" = "http://www.youtube.com/user/OTMTeam";
//    height = 344;
//    html = "<iframe width=\"459\" height=\"344\" src=\"http://www.youtube.com/embed/bxzweSJ3tyE?feature=oembed\" frameborder=\"0\" allowfullscreen></iframe>";
//    "provider_name" = YouTube;
//    "provider_url" = "http://www.youtube.com/";
//    "thumbnail_height" = 360;
//    "thumbnail_url" = "http://i3.ytimg.com/vi/bxzweSJ3tyE/hqdefault.jpg";
//    "thumbnail_width" = 480;
//    title = "High Quality Sample";
//    type = video;
//    version = "1.0";
//    width = 459;
//}
*/
-(void) responseDateForVideoID:(NSString *) vidID response:(NSDictionary *) dict;
@end

// Video Player.

@interface YouTubePlayerView : UIWebView<UIWebViewDelegate> 

@property (nonatomic, assign) id<YouTubePlayerDelegate> playerDelegate;

// Start the player with the video vidID. Player will use default player parameters
-(void) setYouTubeVideo:(NSString *) vidID;

// As SetYouTubeVideo but using the suppled player parameters.
// There are a number of available parameters.
// See https://developers.google.com/youtube/player_parameters
//
// On init the default params are @"'autoplay':0,'rel':0,'showinfo':0,'egm':0,'showsearch':0,controls:1,modestbranding:1,";
// If you wish to change only one remember to include all the others as well e.g., to hide controls use ...
//
// setYouTubeVideo: @"3B8feXci3TY" playerParams:@"'autoplay':0,'rel':0,'showinfo':0,'egm':0,'showsearch':0,controls:0,modestbranding:1,";
//
-(void) setYouTubeVideo:(NSString *) vidID playerParams:(NSString *) parms;

//Plays the currently cued/loaded video. The final player state after this function executes will be playing (1).
-(void) playVideo;

//Seeks to a specified time in the video. If the player is paused when the function is called, it will remain paused.
//If the function is called from another state (playing, video cued, etc.), the player will play the video.

//The allowSeekAhead parameter determines whether the player will make a new request to the server
//if the seconds parameter specifies a time outside of the currently buffered video data.
-(void) seekTo:(float) seconds allowSeekAhead:(BOOL) allow;

//Pauses the currently playing video.
//The final player state after this function executes will be paused (2) unless the player is in the ended (0) state
//when the function is called, in which case the player state will not change.
-(void) pauseVideo;

//Stops and cancels loading of the current video.
//This function should be reserved for rare situations when you know that the user will not be watching additional video
//in the player.
-(void) stopVideo;

// Gives data on vidID and returns it to playerDelegate
// callback -(void) responseDateForVideoID:(NSString *) vidID response:(NSDictionary *) dict;
-(void) dataForVideoID: (NSString *) vidID;

//Returns a number between 0 and 1 that specifies the percentage of the video that the player shows as buffered.
-(float) getVideoLoadedFraction;

//Deprecated as of July 18, 2012. Instead, use the getVideoLoadedFraction method to
//determine the percentage of the videothat has buffered.
//Returns the number of bytes loaded for the current video.
-(float) getVideoBytesLoaded;

//Deprecated as of July 18, 2012. Instead, use the getVideoLoadedFraction method to determine the percentage of the video
//that has buffered.
-(float) getVideoBytesTotal;


//Returns the state of the player. Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
-(int) getPlayerState;

//Returns the elapsed time in seconds since the video started playing.
-(float) getCurrentTime;

//This function retrieves the actual video quality of the current video.
//It returns undefined if there is no current video.
// Possible return values are highres, hd1080, hd720, large, medium and small.
-(NSString *) getPlaybackQuality;

//This function sets the suggested video quality for the current video.
//The suggestedQuality parameter value can be small, medium, large, hd720, hd1080, highres or default.
//We recommend that you set the parameter value to default,
-(void) setPlaybackQuality: (NSString *) suggestedQuality;

//This function returns the set of quality formats in which the current video is available.
//You could use this function to determine whether the video is available in a higher quality
//than the user is viewing, and your player could display a button or other element
//to let the user adjust the quality.
// Returns an NSArray of NSString*
-(NSArray *) getAvailableQualityLevels;

//Returns the duration in seconds of the currently playing video.
//Note that getDuration() will return 0 until the video's metadata is loaded,
//which normally happens just after the video starts playing.

//If the currently playing video is a live event, the getDuration() function will return the elapsed time
//since the live video stream began. Specifically, this is the amount of time that the video has streamed
//without being reset or interrupted. In addition, this duration is commonly longer than the actual
//event time since streaming may begin before the event's start time.
-(float) getDuration;

//Returns the YouTube.com URL for the currently loaded/playing video.
-(NSString *) getVideoUrl;

//This function loads the specified video's thumbnail and prepares the player to play the video.
// The player does not request the video until playVideo() or seekTo() is called.
// Optional suggestedQuality 
-(void) cueVideoById: (NSString *)videoId  startSeconds:(float) start suggestedQuality:(NSString *) qual;

//This function loads and plays the specified video.
// Optional suggestedQuality
-(void) loadVideoById: (NSString *)videoId  startSeconds:(float) start suggestedQuality:(NSString *) qual;

@end
