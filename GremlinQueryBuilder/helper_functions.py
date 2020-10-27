import matplotlib.pyplot as plt
import networkx as nx
import pandas as pd


def create_graph_image(selected_edges, selected_nodes):
    '''create a network graph image'''
    # read airport graphml
    G = nx.read_graphml('/Users/binita/Documents/GremlinQueryBuilder/data/air-routes-small.graphml')
    # remove the first node as it contains metadata only
    G.remove_node("0")
    # color_map = get_color_map(G)
    # colors
    color_map_node = get_color_map_vertices(G, selected_nodes)
    color_map_edge = get_color_map_edges(G, selected_edges)
    options = get_options(color_map_node, color_map_edge)
    label_code = nx.get_node_attributes(G, "code")
    # labels
    labels = list(label_code.values())
    # labels = ["USA", "USA", "USA", "USA", "-PR", "USA"]
    mapping = dict(zip(G, labels))
    G = nx.relabel_nodes(G, mapping)

    nx.draw(G, **options, with_labels=True)
    plt.show()
    # plt.savefig("static/img/image1.png")


def get_color_map(G):
    '''Given a network Graph, return color
        equivalent count of specific property type
    '''
    color_map = []
    for node in G.nodes(data=True):
        data = node[1]
        country = data['country']
        if country == "PR":
            color_map.append("#8983a8")
        else:
            color_map.append("#11572b")
    return color_map


def get_color_map_vertices(G, selected_nodes):
    color_map = []
    for node in G.nodes(data=True):
        data = node[1]
        code = data['code']
        if code in selected_nodes:
            if code == "OAK":
                color_map.append("green")
            else:
                color_map.append("lightgreen")
        else:
            color_map.append("grey")
    return color_map


def get_color_map_edges(G, selected_edges):
    color_map = []
    for edge in G.edges(data=True):
        data = edge[2]
        dist = data['dist']
        if dist in selected_edges:
            color_map.append("green")
        else:
            color_map.append("grey")
    return color_map


def get_options(color_map_node, color_map_edge):
    '''definte and return opions for network graph'''
    options = {
        "node_color": color_map_node,
        "edge_color": color_map_edge,
        "node_size": 330,
        "linewidths": 2,
        "width": 1,
        "font_color": "white",
        "font_size": 7,
        # "edge_color": "#c9c2ad"
        # "arrow_size": 20
    }
    return options


def create_data():
    '''create dummy data to use'''
    node_source = ["Kevin", "Kevin", "Diane", "Emma", "Emma", "Rav", "Rav", "James", "James"]
    node_target = ["Diane", "James", "Kevin", "Diane", "Irma", "Diane", "James", "Nia", "Sal"]
    edge = ["knows"] * len(node_source)
    data = {'source': node_source, 'edge': edge, 'target': node_target}
    df = pd.DataFrame(data=data)


def get_vertex_df():
    # vertex setup
    vertex_label = ["airport"] * 6
    vertex_code = ["ATL", "ANC", "MSP", "SNA", "SJU", "OAK"]
    vertex_city = ["Atlanta", "Anchorange", "Minneapolis", "Santa Ana", "San Juan", "Okland"]
    vertex_country = ["US", "US", "US", "US", "PR", "US"]
    vertex_runway = [5, 3, 4, 2, 2, 4]

    # vertex df
    data = {"label": vertex_label,
                "code": vertex_code,
                "city": vertex_city,
                "country": vertex_country,
                "runway": vertex_runway}
    vertex_df = pd.DataFrame(data=data)
    return vertex_df


def get_edge_df():

    # edge setup
    edge_label = ["route"] * 12
    edge_source = ["ATL", "ATL", "ATL", "ATL", "ANC", "MSP", "MSP", "MSP", "SNA", "SNA", "OAK", "SNA"]
    edge_dest = ["MSP", "SNA", "SJU", "OAK", "MSP", "ATL", "SNA", "OAK", "MSP", "OAK", "ATL", "ATL"]
    edge_dist = [906, 1910, 1550, 2124, 2519, 906, 1522, 1578, 1522, 370, 2124, 910]

    # edge df
    data = {"label": edge_label,
                           "source": edge_source,
                           "dist": edge_dist,
                           "dest": edge_dest}
    edge_df = pd.DataFrame(data=data)
    return edge_df


if __name__ == "__main__":
    # all_nodes = ["ATL", "ANC", "MSP", "SNA", "OAK"]
    all_nodes = ["OAK", "SNA", "MSP", "ATL"]
    # all_edges = [906, 1910, 1550, 2124, 2519, 906, 1522, 1578, 1522, 370, 2124, 910]
    all_edges = [370, 1578, 2124]
    # all_nodes = []
    create_graph_image(all_edges, all_nodes)
    # selected_nodes = ["ATL", "SJU"]
    # selected_edges = [906, 1910]
    # create_graph_image(selected_edges, selected_nodes)
    # create_data()
    