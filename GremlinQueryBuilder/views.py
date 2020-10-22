'''Defines views for this application

This is where the routes are defined.
It may be split into a package of its own (yourapp/views/)
with related views grouped together into modules.

Contains following views/functions:
    * index -
'''


from GremlinQueryBuilder import app
from flask import render_template, request, jsonify, make_response
import pandas as pd
from .helper_functions import get_edge_df, get_vertex_df


@app.route('/')
def home():
    '''renders the home page'''
    return render_template('home.html')


@app.route('/about')
def about():
    '''render about page'''
    return render_template('about.html')


@app.route('/get_query', methods=["POST", "GET"])
def basic_query_selection():
    '''method queries query based on selection'''
    req = request.get_json()  # convert received json to python dictionary
    entity = req['entity']
    property_name = req['property_name']
    property_value = req['property_value']

    # get the correct dataframe to 
    if entity == "V()":
        df = get_vertex_df()
    else:
        df = get_edge_df()
    
    # extract actual data based on property_name and value
    result = df[df[property_name] == property_value]
    print(f'{df} \n {entity} {property_name} {property_value}')
    print(result)
    response = make_response(jsonify(req), 200)
    return response
