'''Defines views for this application

This is where the routes are defined.
It may be split into a package of its own (yourapp/views/)
with related views grouped together into modules.

Contains following views/functions:
    * index -
'''


from GremlinQueryBuilder import app
from flask import render_template


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/about')
def about():
    return render_template('about.html')
