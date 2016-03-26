/**
 * Created by Tiffanys on 3/25/16.
 */
(function() {
        angular
            .module("PaymentApp")
            .factory("SearchService", SearchService);

        function SearchService($http) {
            var api = {
                search :search
            };
            return api;

            function search(request) {
                return $http.post("/api/project/search?search="+request);
            }
        }
})();