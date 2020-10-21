'''Connection to Gremlin Server

This script contains functions to connect to the Gremlin Server
running on the local machine.

Contains the following functions:
    * connect - return g, a graph traversal, used for making queries
    * load_data - load the air-routes-small data to a graph on server
'''


from gremlin_python import statics
from gremlin_python.process.anonymous_traversal import traversal
from gremlin_python.driver.driver_remote_connection import DriverRemoteConnection
from gremlin_python.structure.graph import Graph
from gremlin_python.process.graph_traversal import __


def connect():
    '''Connect to local Gremlin Server'''

    # Connection to local gremlin server
    graph = Graph()
    connection = DriverRemoteConnection('ws://localhost:8182/gremlin', 'g')
    # The connection should be closed on shut down to close open connections with connection.close()
    g = graph.traversal().withRemote(connection)
    # Reuse 'g' across the application


# Query testing
vertex_count = g.V().count().next()

print(vertex_count)
