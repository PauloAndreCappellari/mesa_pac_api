'use strict'

class KahnController {

    async sort ({ request, response, view }) {

        const grafo = JSON.parse(request.input('graph'));
        
        // Calculo dos graus de cada vertice
        const vertices = Object.keys(grafo);
        const inDegree = {};
        for (const v of vertices) {
            for (const neighbor of grafo[v]) {
                inDegree[neighbor] = inDegree[neighbor] + 1 || 1;
            }
        }
        
        // Pilha para armazenamento dos vertices independentes
        const queue = vertices.filter((v) => !inDegree[v]);
        const maxDegree = {};
        let index = 0;
        while (queue.length) {
            const v = queue.shift();
            maxDegree[v] = index++;
            // Ajuste dos graus de entrada adjacentes
            if(grafo[v] == null){
                return response.send("{\"error\":\"-1\"}");//grafo incompleto
        
            } else {
                for (const neighbor of grafo[v]) {
                    inDegree[neighbor]--;
                    if (inDegree[neighbor] === 0) {
                        queue.push(neighbor);
                    }
                }
        
            }
        
        }
        
        if (index !== vertices.length) {
            return response.send("{\"error\":\"-2\"}"); //grafo com ciclos
        }
        
        return response.send("{\"sorted\":" + JSON.stringify(Object.keys(maxDegree)) + "}");
    }
}

module.exports = KahnController
