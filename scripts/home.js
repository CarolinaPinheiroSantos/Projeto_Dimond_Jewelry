// Importação da base de dados e das funções
import { database } from "./database.js";
import { getProdId, loadProducts } from "./functions.js";
 
// -------- Variáveis do projeto ------------------------
const sectionNovidades = document.querySelector("#section-1 .carrousel");
const sectionMaisVendidos = document.querySelector("#section-2 .carrousel");
const sectionPromocoes = document.querySelector("#section-3 .carrousel");
 
// Filtros
let filtroCategoriaNovidades = database.filter(produto => produto.classificacaoProduto === "Novidades" && produto.exibirHome == true);
let filtroMaisVendidos = database.filter(produto => produto.classificacaoProduto === "Mais_Vendidos" && produto.exibirHome == true);
let filtroPromocoes = database.filter(produto => produto.classificacaoProduto === "Promocoes" && produto.exibirHome == true);
 
// Funções com parâmetros
loadProducts(filtroCategoriaNovidades, sectionNovidades);
loadProducts(filtroMaisVendidos, sectionMaisVendidos);
loadProducts(filtroPromocoes, sectionPromocoes);
getProdId();
 
// ------- Carrousel de produtos (Seção Novidades) -------------------
 
// Seção "Novidades"
const productCarousel1 = document.querySelector('#section-1 .carrousel');
const prevBtn1 = document.querySelector('#section-1 .prev');
const nextBtn1 = document.querySelector('#section-1 .next');
 
// Constantes para o número de produtos por vez e a largura de cada produto
const productsToShow = 4; // Número de produtos visíveis por vez
const cardWidth = 270; // Largura de cada card
 
let scrollAmount1 = 0; // Quantidade de deslocamento
 
// Função para garantir que o cálculo seja feito após o carregamento dos produtos
function initializeCarousel() {
  // Cálculo do número total de produtos no carrossel
  const totalProducts = productCarousel1.children.length; // Contando quantos produtos existem
 
  // Número máximo de movimentos do carrossel (limite de rolagem)
  const maxScroll = (totalProducts - productsToShow) * cardWidth;
 
  nextBtn1.addEventListener('click', () => {
    scrollAmount1 += productsToShow * cardWidth; // Avança 4 produtos (4 cards)
    if (scrollAmount1 > maxScroll) {
      scrollAmount1 = maxScroll; // Não deixa ultrapassar o fim do carrossel
    }
    productCarousel1.style.transform = `translateX(-${scrollAmount1}px)`; // Aplica o movimento
  });
 
  prevBtn1.addEventListener('click', () => {
    scrollAmount1 -= productsToShow * cardWidth; // Retrocede 4 produtos (4 cards)
    if (scrollAmount1 < 0) {
      scrollAmount1 = 0; // Impede ir para posições negativas
    }
    productCarousel1.style.transform = `translateX(-${scrollAmount1}px)`; // Aplica o movimento
  });
}
 
// Esperar o carregamento dos produtos antes de inicializar o carrossel
window.addEventListener('load', initializeCarousel);