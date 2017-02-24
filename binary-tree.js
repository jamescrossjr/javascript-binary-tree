(function(){

/**
 * @desc binary tree constructor
 */
function BinaryTree(){
    this.rootNode = null;
}

/**
 * @desc node constructor
 * @param {Number} value
 */
function Node(value){
    this.value = value;
    this.left = null; 
    this.right = null;
}

/**
 * @desc recursive add node to binary tree method
 * @param {Object} newNode
 * @param {Object} nextNode, optional
 */
BinaryTree.prototype.addNode = function(newNode, nextNode){
    var curNode, rootNode = this.rootNode;

    if(!newNode){
        return;
    }

    if(!rootNode){
        this.rootNode = newNode;
        return;
    }

    if(!nextNode){
        curNode = rootNode;
    } else {
        curNode = nextNode;
    }

    if(curNode.value > newNode.value){
        if(!curNode.left){
            curNode.left = newNode;
            return;
        }    
        this.addNode(newNode, curNode.left);

    } else {
        if(!curNode.right){
            curNode.right = newNode;
            return;
        }
        this.addNode(newNode, curNode.right);
    }
};

/**
 * @desc get parent node for a value. getting parent rather than the node itself so that method
 * can be used for both getting and removing nodes.
 * 
 * @param {Number} value
 * @param {Object} nextNode, optional
 * @return {Object} the parent node
 */
BinaryTree.prototype.getParentNode = function(value, nextNode){
    var curNode, rootNode = this.rootNode;

    if(!rootNode){
        return null;
    }

    if(!nextNode){
        curNode = rootNode;
    } else {
        curNode = nextNode;
    }

    if(curNode.value > value){
        if(!curNode.left){
            return null;
        } 
        if(curNode.left.value === value) {
            return curNode;
        }
        
        return this.getParentNode(value, curNode.left);
    }

    if(curNode.value < value){
        if(!curNode.right){
            return null;
        }
        if(curNode.right.value === value){
            return curNode;
        }
        return this.getParentNode(value, curNode.right);
    }
    return null;
    
}

/**
 * @param {Number} value
 */
BinaryTree.prototype.removeNode = function(value){
    var leftNode, rightNode, 
    rootNode = this.rootNode;

    if(!rootNode){
        return;
    }

    // handle case where node to remove is the root node
    if(rootNode.value === value){
        leftNode = rootNode.left;
        rightNode = rootNode.right;
        delete this.rootNode;
        this.addNode(leftNode);
        this.addNode(rightNode);
        return;
    }

    var parentNode = this.getParentNode(value);

    if(parentNode.left && parentNode.left.value === value){
        //preserve child nodes of node to be deleted.
        leftNode = parentNode.left.left;
        rightNode = parentNode.left.right;
        delete parentNode.left;
        //re-add child nodes to tree
        this.addNode(leftNode);
        this.addNode(rightNode);
    }
    if(parentNode.right && parentNode.right.value === value){
        leftNode = parentNode.right.left;
        rightNode = parentNode.right.right;
        delete parentNode.right;
        this.addNode(leftNode);
        this.addNode(rightNode);
    }
}

/**
 * @param {Number} value
 * @return {Object} the parent node
 */
BinaryTree.prototype.getNode = function(value){
    var parentNode = this.getParentNode(value);
    if(parentNode.left && parentNode.left.value === value){
        return parentNode.left;
    }
    if(parentNode.right && parentNode.right.value === value){
        return parentNode.right;
    }
    return null;
}

BinaryTree.prototype.reverse = function(){
    var rootNode = this.rootNode;

    swapChildren(rootNode);

    function swapChildren(node){
        var newLeft, newRight;
        
        if(!node){
            return;
        }

        //preserve children;
        newRight = node.left ? Object.assign({}, node.left) : null;
        newLeft = node.right ? Object.assign({}, node.right) : null;        
        node.left = newLeft;
        node.right = newRight;

        if(node.left){
            swapChildren(node.left);
        }
        if(node.right){
            swapChildren(node.right);
        }
    }
}

//trying it out :)
var tree = new BinaryTree();
tree.addNode(new Node(2));
tree.addNode(new Node(1));
tree.addNode(new Node(3));
tree.addNode(new Node(-1));
tree.addNode(new Node(10));
tree.addNode(new Node(7));
tree.addNode(new Node(8));
tree.addNode(new Node(11));
console.log(JSON.stringify(tree.rootNode));
tree.removeNode(2);
console.log(JSON.stringify(tree.rootNode));
console.log(JSON.stringify(tree.getNode(7)));
tree.reverse();
console.log(JSON.stringify(tree.rootNode));



//TODO: build a non-recursive version...

//non recursive add node method
// BinaryTree.prototype.add = function(value){
//     var curNode, rootNode = this.rootNode;

//     if(!rootNode){
//         this.rootNode = new Node(value);
//         return;
//     }

//     curNode = rootNode;

//     while(curNode){
//         if(curNode.value > value){
//             if(!curNode.left){
//                 curNode.left = new Node(value);
//                 break;
//             } else {
//                 curNode = curNode.left;
//             }
//         } else {
//             if(!curNode.right){
//                 curNode.right = new Node(value);
//                 break;
//             } else {
//                 curNode = curNode.right;
//             }
//         }
//     }
// };

}());
