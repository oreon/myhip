'use strict';

var app = angular.module('jhipsterApp');

angular.module('jhipsterApp').factory('Student', function () {
	  return { firstName: "jag" , lastName:"Singh"};
});


app.directive("kid", function() {
	  return {
	    restrict: "E",
	    scope: {},
	    template: '<input type="text" ng-model="chore"> {{chore}}'
	  };
});


app.directive("enter", function () {
	  return function (scope, element, attrs) {
	    element.bind("mouseenter", function () {
	      element.addClass(attrs.enter);
	      console.log("entered")
	      scope.$apply(attrs.enter);
	    });
	  };
	});
	app.directive("leave", function () {
	  return function (scope, element, attrs) {
	    element.bind("mouseleave", function () {
	      element.removeClass(attrs.enter);
	    });
	  };
	});



angular.module('jhipsterApp').filter('reverseme', function () {
	  return function (text) {
	    return text.split("").reverse().join("");
	  }
});

angular.module('jhipsterApp')
.controller('MyController', function ($scope, Student, Book) {
	
	$scope.data = Student;
	$scope.books = [];
	$scope.page = 1;
	
	$scope.create = function (book) {
       
        toastr.success("Success" + book.title);
        Book.update(book,
                function () {
                   	$scope.loadAll();
                   // $('#saveBookModal').modal('hide');
                   $scope.clear();
                });
        
    };
    
    $scope.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    
    $scope.gridOptions = { 
    	 data: 'books' ,
    	 showGroupPanel: true,
    	 showFilter: true,
    	 columnDefs: [{field:'title', displayName:'Title'}, 
    	              {field:'price', displayName:'Price'},
    	              {field:'author.name', displayName:'Author'},
    	 			]
    	 
    };
    
    $scope.clear = function () {
        $scope.book = {title: null, price: null, id: null};
        $scope.editBookForm.$setPristine();
        $scope.editBookForm.$setUntouched();
    };
    
    
    
    $scope.loadAll = function() {
        Book.query({page: $scope.page, per_page: 20}, function(result, headers) {
            //$scope.links = ParseLinks.parse(headers('link'));
            $scope.books = result;
        });
    };
    
  //TODO put in activate function
    $scope.loadAll();
    
    
    $scope.loadMoreTweets = function () {
        console.log("Loading tweets!");
    }
    
	 $scope.deleteTweets = function () {
	    console.log("deleting tweets!");
	 }
});


angular.module('jhipsterApp')
.controller('SecController', function ($scope, Data) {
	
	$scope.data = Data;
	
	

});


angular.module('jhipsterApp')
    .controller('BookController', function ($scope, Book, Author, ParseLinks) {
        $scope.books = [];
        $scope.authors = Author.query();
        $scope.page = 1;
        $scope.loadAll = function() {
            Book.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.books = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Book.update($scope.book,
                function () {
                    $scope.loadAll();
                    $('#saveBookModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Book.get({id: id}, function(result) {
                $scope.book = result;
                $('#saveBookModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Book.get({id: id}, function(result) {
                $scope.book = result;
                $('#deleteBookConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Book.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteBookConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.book = {title: null, price: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
