'''Initialize package

This file initializes your application and brings
together all of the various components.
[Tells python interpreter this is a package]
'''


from flask import Flask

app = Flask(__name__)

from GremlinQueryBuilder import views
