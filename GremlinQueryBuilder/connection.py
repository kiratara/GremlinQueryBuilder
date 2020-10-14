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


def load_data():
    ''''''
    ### 
    client.submit("graph.io(graphml()).readGraph('/Users/binita/Documents/GremlinQueryBuilder/data/air-routes-small.graphml');[]").all().result()

# Query 
vertex_count  = g.V().count().next()

print (vertex_count)
