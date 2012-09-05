// wait until page is ready
$(document).ready(function() {
    // call meetup.com
    callMeetupAsync();
});

function callMeetupAsync() {

    // Note: if you want to change any parameters passed to meetup.com, you need to:
    // 1) login to meetup.com
    // 2) go to http://www.meetup.com/meetup_api/console/?path=/2/events
    // 3) specify list of group IDs (comma-delimited) in "group_id" field   (see "to get your group_id's" below)
    // 4) specify number of results in "page" field
    // 5) click "show response" and copy/paste the "signed URL"
    // (alternatively, you can use the regular request URL if you are careful to not share the key with anyone)

    // to get your group_id's:
    // 1) login to meetup.com
    // 2) go to http://www.meetup.com/meetup_api/console/?path=/2/groups
    // 3) specify "self" for member_id
    // 4) click "show response" and search for "link:" in the response
    // 5) group ID will be in "id:" field below "link"

    return $.ajax({
        url: 'http://api.meetup.com/2/events?group_id=2350421%2C1375847%2C163680&status=upcoming&_=1346815100146&order=time&desc=false&offset=0&format=json&page=20&fields=&sig_id=11777029&sig=a14e979a98182f2be09acc8629283484032c507c',
//        data: {
//            group_id: "2350421,1375847,163680" // preferred format for URL parms, but not easy to copy paste "signed URL" from meetup.com
//        },
        type: 'GET',
        timeout: 8000,
        dataType: 'jsonp',

        success: function(json) {
            console.log("done getting Meetup Events");

            // generate friendly date string and put it into results
            // TODO: create helper function with Handlebars.registerHelper
            for (var i = 0; i < json.results.length; i++) {
                json.results[i].formattedDate = new Date(json.results[i].time);
            }

            //compile HTML template (see HTML for template)
            var meetupTemplate = Handlebars.compile($("#meetup-result-template").html());

            // pass data to template
            var html = meetupTemplate({events:json.results});

            // add the html to the DOM
            $('#output').append(html);

        },

        error:function (jqXHR, textStatus, errorThrown) {
            console.log("API error: "+textStatus);
            alert('Sorry, there was a problem retrieving Meetup Events');
        }
    });
}

