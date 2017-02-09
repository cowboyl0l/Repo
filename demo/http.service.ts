import {Injectable} from '@angular/core';
import { Http} from '@angular/http';
declare var jQuery:any;

@Injectable()
export class HttpService{
 public domainName: string = "http://rus36.com:8088";

    constructor(private http: Http){
        //this.domainName = "http://192.168.1.170";
       this.domainName = "http://localhost";
     }


    getData(){
        return this.http.get( this.domainName + '/api/Tree/GetTree/FurnitureTestTree');
    }

    getProperty(){
        return this.http.get( this.domainName + '/api/Tree/GetTree/FurnitureTestTree');
    }

    getObjects(className: string)
    {
         return this.http.get( this.domainName + '/api/DataBaseObject/'+ className);
    }

    renameProperty(newPropertyName: string, oldPropertyName: string, propertyOwner: string)
    {
         var treeName = "FurnitureTestTree";
         var data = {TreeName: treeName,
             NewPropertyName: newPropertyName,
              OldPropertyName:oldPropertyName,
              NodeName: propertyOwner};
        jQuery.ajax({
        type: "POST",
        url: this.domainName + '/api/Tree/RenameProperty',
        data: data,
        success: function(){
        }});
    }

    addProperty(newPropertyName: string, propertyOwner: string)
    {
        var treeName = "FurnitureTestTree";
        var propertyName = "STRING";
        var data = {TreeName: treeName,
             PropertyType: propertyName,
              NodeName:propertyOwner,
              PropertyName: newPropertyName};
        jQuery.ajax({
        type: "POST",
        url: this.domainName + '/api/Tree/AddProperty',
        data: data,
        success: function(){
        }});
    }

    deleteProperty(propertyOwner: string, propertyName: string)
    {
        var treeName = "FurnitureTestTree";
        var data = {TreeName: treeName,
              NodeName:propertyOwner,
              PropertyName: propertyName};
        jQuery.ajax({
        type: "POST",
        url: this.domainName + '/api/Tree/RemoveProperty',
        data: data,
        success: function(){
        }});
    }

    addClass(newClassName: string,parentClassName: string)
    {
        var TreeName = "FurnitureTestTree";
        var data = {TreeName:TreeName, ParentName:parentClassName, NodeName: newClassName};
        jQuery.ajax({
        type: "POST",
        url: this.domainName + '/api/Tree/AddNode',
        data: data,
        success: function(){
        }});
    }



    deleteClass(className: string){
        var data = {Class:className, ClassName:'FurnitureTestTree'};
        jQuery.ajax({
        type: "POST",
        url: this.domainName + '/api/Tree/RemoveTreeRecord',
        data: data,
        success: function(){
        }});
    }



}
