// variables
/**
 * basicCount -  g.V().has(property, value).count()
 * basicValue -  g.V().has(property, value).value()
 * basicValueSpecific  - g.V().has(property, value).value(properties)
 * 
 * valueMap - g.V().has(property, value).valueMap(options- properties)
 *  
 */
var vertexPropertyOptions = ["label", "code", "city", "country", "runaways"]
var edgePropertyOptions = ["label", "dist"]

var vertexPropertyNameOptions = {
    "label": ["airport"],
    "code": ["ATL", "ANC", "MSP", "SNA", "SJU", "OAK"],
    "city": ["Atlanta", "Anchorage", "Minneapolis", "Santa Ana", "San Juan", "Oakland"],
    "country": ["US", "PR"],
    "runaways": [2, 3, 4, 5]
}

var edgePropertyNameOptions = {
    "label": ["route"],
    "dist": [906, 1910, 1550, 2124, 2519, 906, 1522, 1578, 1522, 370, 2124, 910]
}

/**
 * Remove option children of select element
 * @param {Element} selectElement 
 */
function removeSelectOption(selectElement){
    while (selectElement.options.length > 0){
        selectElement.remove(0)
    }
}

/**
 * Update options of select element
 * @param {Element} selectElement 
 * @param {Array} options 
 */
function updateSelectOption(selectElement, options){
    for (var i = 0; i < options.length; i++){
        currentItem = options[i];
        var element = document.createElement("option");
        if (currentItem === "label"){
            element.selected = true;
        }
        element.innerText = currentItem;
        element.value = currentItem;
        selectElement.append(element)
    }
}

/**
 * Capture selected value of entity and update 
 * select options for next (property name ) selections
 */
function updatePropertyNameOptions() {
    var entity = document.getElementById("entity");
    var entityValue = entity.value;

    if (entityValue == "V()") {
        options = ["label", "code", "city", "country", "runaways"]
    } else {
        options = ["label", "dist"]
    }
    propertyNameElement = document.getElementById("propertyName");
    removeSelectOption(propertyNameElement);
    // also update propertyValue to include values for label by default
    propertyValueElement = document.getElementById("propertyValue");
    removeSelectOption(propertyValueElement);
    setDefaultLabelOption(entity);
    updateSelectOption(propertyNameElement, options);
}

/**
 * Captures entity and propertyName and updates the propertyValue options
 */
function updatePropertyValueOptions(){
    var entity = document.getElementById("entity");
    var propertyName = document.getElementById("propertyName")

    var entityValue = entity.value;
    var propertyName = propertyName.value;

    
    if (entityValue === "V()") {
        options = vertexPropertyNameOptions[propertyName]
    } else {
        options = edgePropertyNameOptions[propertyName]
    } 
    propertyValueElement = document.getElementById("propertyValue");
    removeSelectOption(propertyValueElement);
    updateSelectOption(propertyValueElement, options);
}


function setDefaultLabelOption(entity){
    var vertexOptions = ["airport"]
    var edgeOptions = ["route"];
    propertyValueElement = document.getElementById("propertyValue");
    if (entity == "V()"){
        updateSelectOption(propertyValueElement, vertexOptions)
    } else {
        updateSelectOption(propertyValueElement, edgeOptions)
    }
}
/**
 * onclick() for submit
 * query flask to get data and return the data + query value
 */
function getQueryResult(){
    var entity = document.getElementById("entity");
    var propertyName = document.getElementById("propertyName");
    var propertyValue = document.getElementById("propertyValue");

    // create value to send to flask route
    var options = {
        entity: entity.value,
        propertyName: propertyName.value,
        propertyValue: propertyValue.value
    };
    console.log("line 62 inside getQueryResult()");
    // make request to flask
    // fetch(`${window.origin}/get_query`, {
    //     method: 'POST',
    //     credentials: 'include',
    //     body: JSON.stringify(options),
    //     cache: 'no-cache',
    //     headers: new Headers({
    //         "content-type":"application/json"
    //     })
    // })
    // // when response is received from flask
    // .then(function(response){
    //     if(response.status !== 200) {
    //         console.log(`Response status was not 200: ${response.status}`);
    //         return;
    //     } 
    //     response.json().then(function (data){
    //         console.log(data)
    //     })
    // })
    create_basic_query(options);
}

/**
 * create string query based on selections by user
 * @param {object} options 
 */
function create_basic_query(options){
    basicQueryString = "g." + options.entity + "."+ "has(\"" + options.propertyName + "\"\, \"" + options.propertyValue +  "\"\)";
    console.log(basicQueryString);
    queryParagraphElement = document.getElementById("basicQueryString");
    queryParagraphElement.innerText = '';
    queryParagraphElement.innerText = basicQueryString;
}