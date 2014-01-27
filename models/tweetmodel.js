var mongoose = require('mongoose')
   ,Schema = mongoose.Schema;
 
var tweetNameSchema = mongoose.Schema({
    coordinates: String,
    created_at: Date,
    current_user_retweet : String,
    //entities
    favorite_count: Number,
    favorited: String,
    filter_level: String,
    id: Number,
    id_str: String,
    in_reply_to_screen_name: String,
    in_reply_to_status_id: Number,
    in_reply_to_status_id_str: String,
    in_reply_to_user_id: Number,
    in_reply_to_user_id_str: String,
    lang: String,
    //place
    possibly_sensitive: Boolean,
    //scopes
    retweet_count: Number,
    retweeted: Boolean,
    //retweeted_status: 
    source: String,
    text: String,
    truncated: Boolean,
    user: {
    	contributors_enabled: Boolean,
    	created_at: Date,
    	default_profile: Boolean,
    	default_profile_image: Boolean,
    	description: String,
    	//entities
    	favourites_count: Number,
    	follow_request_sent: Boolean,
    	following: Boolean,
    	followers_count: Number,
		friends_count: Number,
		geo_enabled: Boolean,
		id: Number,
		id_str: String,
		is_translator: Boolean,
		lang: String,
		listed_count: Number,
		location: String,
		name: String,
		notifications: Boolean,
		profile_background_color: String,
		profile_background_image_url: String,
		profile_background_image_url_https: String,
		profile_background_tile: Boolean,
		profile_banner_url: String,
		profile_image_url: String,
		profile_image_url_https: String,
		profile_link_color: String,
		profile_sidebar_border_color: String,
		profile_sidebar_fill_color: String,
		profile_text_color: String,
		profile_use_background_image: Boolean,
		//protected
		screen_name: String,
		show_all_inline_media: Boolean,
		//status
		statuses_count: Number,
		time_zone: String,
		url: String,
		utc_offset: Number,
		verified: Boolean,
		withheld_in_countries: String,
		withheld_scope: String
    },
    withheld_copyright: Boolean,
    //withheld_in_countries: 
    withheld_scope: String,
    name: String,
    text: String
}, {collection: 'tweetcol' });


module.exports = mongoose.model('Tweet', tweetNameSchema);