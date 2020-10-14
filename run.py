'''Entry point to the application

This is the file that is invoked to start up a development server.
It gets a copy of the app from your package and runs it.
'''


from GremlinQueryBuilder import app


if __name__ == "__main__":
    app.run(debug=True)
