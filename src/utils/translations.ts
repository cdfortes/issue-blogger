
interface TranslationItem {
  [key: string]: string | TranslationItem;
}

interface Translations {
  [key: string]: TranslationItem;
}

export const translations: Translations = {
  header: {
    en: "My Personal Blog",
    pt: "Meu Blog Pessoal"
  },
  search: {
    owner: {
      en: "Owner (e.g. facebook)",
      pt: "Proprietário (ex: facebook)"
    },
    repo: {
      en: "Repository (e.g. react)",
      pt: "Repositório (ex: react)"
    },
    labels: {
      en: "Filter by labels (comma separated)",
      pt: "Filtrar por etiquetas (separadas por vírgula)"
    },
    button: {
      en: "Search",
      pt: "Buscar"
    }
  },
  posts: {
    title: {
      en: "Blog Posts from",
      pt: "Posts do Blog de"
    },
    loadMore: {
      en: "Load More",
      pt: "Carregar Mais"
    },
    loading: {
      en: "Loading...",
      pt: "Carregando..."
    },
    noResults: {
      en: "No posts found",
      pt: "Nenhum post encontrado"
    },
    tryAgain: {
      en: "Try Again",
      pt: "Tentar Novamente"
    },
    error: {
      en: "Failed to load posts. Please try again later.",
      pt: "Falha ao carregar posts. Por favor, tente novamente mais tarde."
    }
  }
};
