(function(){
	'use strict';
	
	angular.module("contactApp", ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		
		$urlRouterProvider.otherwise('/home');
		
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home.html',
			controller: 'homeController'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'contact.html',
			controller: 'contactController'
		})	
		.state('about', {
			url: '/about',
			templateUrl: 'about.html',
			controller: 'aboutController'
		});
	})
	.controller("mainCtrl", function($scope){
		
	})
	.controller("homeController", function($scope, $location, $state, contactService){
		if(!!contactService.contactToEdit){
			$scope.contactform = contactService.contactToEdit;
		}else{
			$scope.contactform = "";		
		}
		
		$scope.submitForm = function(isValid){
			if(isValid){
				console.log("submitted successfully");
				contactService.save($scope.contactform);
				contactService.contactToEdit = {};
				$scope.contactform = {};
				$state.go("contact");
			}
		}
	})
	.controller("contactController", function($scope,$location, $state, contactService){
		$scope.contacts = contactService.list();		
		$scope.delContact = function (item) {
			var index = $scope.contacts.indexOf(item);
			$scope.contacts.splice(index, 1);			
		};
		$scope.editContact = function(item){
			var contactToEdit = item;
			contactService.edit(contactToEdit);
			$scope.contactform = {};
			$state.go("home");
			
		}
	})
	.controller("aboutController", function($scope){
		
	})
	.service("contactService", function(){
		var contacts = [];		
		this.save = function(contact){			
			if(contacts.indexOf(contact) === -1){
				contacts.push(contact);			
			}
		}
		this.edit = function(contact){
			this.contactToEdit = contact;				
		}
		this.list = function(){
			return contacts;
		}
	});
})();

