
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  header: {
    en: "Issue Blogger",
    pt: "Blog de Issues"
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
      en: "Labels (comma separated)",
      pt: "Etiquetas (separadas por vírgula)"
    },
    button: {
      en: "Search",
      pt: "Buscar"
    }
  },
  posts: {
    title: {
      en: "Latest Posts from",
      pt: "Últimos Posts de"
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

