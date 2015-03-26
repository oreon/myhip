'use strict';

angular.module('jhipsterApp')
    .factory('Author', function ($resource) {
        return $resource('api/authors/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    var birthdayFrom = data.birthday.split("-");
                    data.birthday = new Date(new Date(birthdayFrom[0], birthdayFrom[1] - 1, birthdayFrom[2]));
                    var joinDateFrom = data.joinDate.split("-");
                    data.joinDate = new Date(new Date(joinDateFrom[0], joinDateFrom[1] - 1, joinDateFrom[2]));
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
