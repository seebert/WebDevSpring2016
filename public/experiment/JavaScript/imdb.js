(function (){

    $(init);

    var $movieTitle;
    var $searchBtn;
    var $searchResults;
    var searchURl = "http://www.omdbapi.com/s=TITLE";

    function init() {

        $movieTitle = $("#movieTitle"); //This will pull data from form w/ id movieTitle
        $searchBtn = $("#searchBtn");
        $searchResults = $("#results tbody");

        $searchBtn.click(searchMovie());
    }

    function searchMovie() {
        var title = $movieTitle.val();
        console.log("Title" + title);
        var url = searchURl.replace("TITLE", title);

        alert("URL: "+ url);
        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(response){
        console.log(response);
        var totalResults = response.totalResults;
        var movies = response.search;
        for(var n = 0; n <movies.length; n++){
            console.log(movies.Title);
            var movie = movies[n];
            var title = movie.Title;
            var year = movie.Year;
            var poster = movie.Poster;

            var $tr = $("<tr>");

            var $img = $("<img>")
                .attr("src", poster)
                .addClass("thumb-poster");

            var $td = $("<td>");
            $td.append($img);
            $tr.append($td);

            $td = $("<td>")
                .append(title)
                .appendTo($tr); // This is combining the lines above


        }
    }
})();