// app.js
var routerApp = angular.module('routerApp', [ 'ui.router', 'ngResource' ]);

angular.module('routerApp').factory('bookService', function($resource) {
	return $resource('api/books/:id', {}, {
		'query' : {
			method : 'GET',
			isArray : true
		},
		'get' : {
			method : 'GET',
			transformResponse : function(data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		'update' : {
			method : 'PUT'
		}
	});
});

routerApp
		.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

			$urlRouterProvider.otherwise('/home');

			$stateProvider

					// HOME STATES AND NESTED VIEWS
					// ========================================
					.state('home', {
						url : '/home',
						templateUrl : '/partials/partial-home.html'
					})

					.state('books', {
						url : '/manage/books',
						
						resolve : {
							books :[ 'bookService', function(bookService) {
								
								return bookService.query(); //{page: $scope.page, per_page: 6}); 
								//return [];
							}],
							book : function() {
								return {};
							}
						},
						templateUrl : '/partials/listBooks.html',
						controller : 'booksController',
					// controllerAs : 'books'
					})

					// Edit book state
					.state(
							'manageBook',
							{
								url : '/manage/book/:id',
								
								resolve : {
									books : function() {
										return [];
									},
									
									book : [
											'$stateParams',
											'bookService',
											function($stateParams, bookService) {
												
												//alert($stateParams.id)	;
												
												if(!$stateParams.id ){
													return {};
												}
											
												 bk =  bookService.get({id:$stateParams.id});
														
												 
												return bk;
											} ]
											
								}, 
								templateUrl : '/partials/manageBook.html',
								controller : 'booksController',
								controllerAs : 'books'
							})

					// nested list with custom controller
					.state(
							'home.list',
							{
								url : '/list',
								templateUrl : '/partials/partial-home-list.html',
								controller : function($scope) {
									$scope.dogs = [ 'Bernese', 'Husky',
											'Goldendoodle' ];
								}
							})

					// nested list with just some random string data
					.state('home.paragraph', {
						url : '/paragraph',
						template : 'I could sure use a drink right now.'
					})

					// ABOUT PAGE AND MULTIPLE NAMED VIEWS
					// =================================
					.state('about', {
						url : '/about',

						views : {

							// the main template will be placed here (relatively
							// named)
							'' : {
								templateUrl : 'partials/partial-about.html'
							},

							// the child views will be defined here (absolutely
							// named)
							'columnOne@about' : {
								template : 'Look I am a column!'
							},

							// for column two, we'll define a separate
							// controller
							'columnTwo@about' : {
								template : 'table-data.html',
								controller : 'scotchController'
							}
						}

					});

			// locationProvider.html5Mode(true);

		});

routerApp.controller('booksController', [ '$state', 'bookService', '$scope', 'books', 'book',
    function($state, bookService, $scope, books, book) {

			$scope.book = book;
			$scope.message = "List books";

			this.bookQuery = $state.params.query;

			$scope.books = books;
			
			$scope.activate = function() {
				
				//alert (book.title);
				/*
				
				bookService.query({page: $scope.page, per_page: 6}, function(result, headers) {
	                //$scope.links = ParseLinks.parse(headers('link'));
	               
	                $scope.books = result;
	            });
				
				
				$http.get('/api/books').then(function(response) {
					$scope.books = response.data;
				});*/
			}
			
			$scope.activate();
			
			

			$scope.create = function() {
				alert("called" + $scope.book.title);
				$state.go('books');
				/*
				bookService.update($scope.book, function() {
					$state.go('books');
				});*/
			};

			this.searchbooks = function(query) {
				if (!query.length)
					return $state.go('books');

				$state.go('search', {
					query : query
				});
			};
		} ]);

routerApp.controller('scotchController', function($scope) {

	$scope.message = 'test';

	$scope.scotches = [ {
		name : 'Macallan 12',
		price : 50
	}, {
		name : 'Chivas Regal Royal Salute',
		price : 10000
	}, {
		name : 'Glenfiddich 1937',
		price : 20000
	} ];

});