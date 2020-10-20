import matplotlib.pyplot as plt
import networkx as nx


def create_graph_image():
    '''create a network graph image'''
    # read airport graphml
    G = nx.read_graphml('/Users/binita/Documents/GremlinQueryBuilder/data/air-routes-small.graphml')
    # remove the first node as it contains metadata only
    G.remove_node("0")
    color_map = get_color_map(G)
    options = get_options(color_map)
    label_code = nx.get_node_attributes(G, "code")
    labels = list(label_code.values())
    print(labels)
    nx.draw(G, **options, with_labels=True, label=labels)
    plt.show()


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


def get_options(color_map):
    '''definte and return opions for network graph'''
    options = {
        "node_color": color_map,
        "node_size": 330,
        "linewidths": 0,
        "width": 0.1,
        "font_color": "white",
        "font_size": 7,
        "edge_color": "#c9c2ad"
        # "arrow_size": 20
    }
    return options


if __name__ == "__main__":
    create_graph_image()
