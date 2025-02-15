from dataclasses import dataclass
from typing import List, Dict, Union
from flask import Flask, request, jsonify
from collections import deque, defaultdict
import re

# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
    name: str

@dataclass
class RequiredItem():
    name: str
    quantity: int

@dataclass
class Recipe(CookbookEntry):
    required_items: List[RequiredItem]

@dataclass
class Ingredient(CookbookEntry):
    cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook: Dict[str, CookbookEntry] = {}

# Task 1 helper (don't touch)
@app.route("/parse", methods=['POST'])
def parse():
    data = request.get_json()
    recipe_name = data.get('input', '')
    parsed_name = parse_handwriting(recipe_name)
    if parsed_name is None:
        return 'Invalid recipe name', 400
    return jsonify({'msg': parsed_name}), 200

# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that 
def parse_handwriting(recipeName: str) -> Union[str | None]:
    result = re.sub(r'[-_]', ' ', recipeName)
    result = re.sub(r'[^A-Za-z\s]', '', result)
    result = ' '.join(word.capitalize() for word in result.split())
    return result if result else None


# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route('/entry', methods=['POST'])
def create_entry():
    data = request.get_json()
    entry_type = data.get('type')
    entry_name = data.get('name')

    if entry_type != 'recipe' and entry_type != 'ingredient':
        return 'Invalid entry type', 400
    if entry_name in cookbook:
        return 'Entry name must be unique', 400

    if entry_type == 'recipe':
        entry = _parse_recipe(entry_name, data)
    else:
        entry = _parse_ingredient(entry_name, data)
    
    # If entry is an error tuple, return error
    if isinstance(entry, tuple):
        return entry

    cookbook[entry_name] = entry
    return '', 200

def _parse_recipe(entry_name, data):
    req_items_data = data.get('requiredItems')
    req_items_list = []
    seen_items = set()

    for item in req_items_data:
        item_name = item.get('name')
        quantity = int(item.get('quantity'))

        if item_name in seen_items:
            return 'Duplicate required item', 400
        
        seen_items.add(item_name)
        req_items_list.append(RequiredItem(item_name, quantity))
    
    return Recipe(entry_name, req_items_list)

def _parse_ingredient(entry_name, data):
    cook_time = int(data.get('cookTime'))
    if cook_time < 0:
        return 'Invalid cook time', 400
    return Ingredient(entry_name, cook_time)


# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route('/summary', methods=['GET'])
def summary():
    recipe_name = request.args.get('name')
    if recipe_name not in cookbook:
        return 'Invalid recipe', 400
    
    entry = cookbook[recipe_name]
    if not isinstance(entry, Recipe):
        return 'Invalid recipe', 400
    
    ingredients_list = []
    total_cook_time = _collect_ingredients(entry, ingredients_list)

    # If an error tuple was returned, propagate it
    if isinstance(total_cook_time, tuple):
        return total_cook_time

    res = {
        "name": recipe_name,
        "cookTime": total_cook_time,
        "ingredients": ingredients_list
    }
    return jsonify(res), 200

def _collect_ingredients(recipe, ingredients_list):
    """
    Iteratively collects all ingredients using a queue, then populates
    ingredients list and calculates total cook time.
    """
    ingredients_dict = defaultdict(int)
    total_cook_time = 0

    q = deque([(recipe, 1)])
    while q:
        curr_recipe, recipe_quantity = q.popleft()
        for req in curr_recipe.required_items:
            req_name = req.name
            req_quantity = req.quantity * recipe_quantity

            if req_name not in cookbook:
                return 'Required item not in cookbook', 400
            
            entry = cookbook[req_name]
            if isinstance(entry, Recipe):
                q.append((entry, req_quantity))
            else:
                ingredients_dict[req_name] += req_quantity 

    for ingredient, quantity in ingredients_dict.items():
        ingredients_list.append({"name": ingredient, "quantity": quantity})
        total_cook_time += cookbook[ingredient].cook_time * quantity
    
    return total_cook_time


# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == '__main__':
    app.run(debug=True, port=8080)
