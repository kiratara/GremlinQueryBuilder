'''Defines views for this application

This is where the routes are defined.
It may be split into a package of its own (yourapp/views/)
with related views grouped together into modules.

Contains following views/functions:
    * index -
'''


from GremlinQueryBuilder import app


@app.route('/')
def index():
    # return 'Hello, World! This is the index page'
    return render_template('index.html')
