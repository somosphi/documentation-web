import Vue from 'vue';
import Vuex from 'vuex';
import * as axios from 'axios';
import { DocsBackendIntegration } from '../../integrations/docs-backend/index';

Vue.use(Vuex);

export const docsBackendIntegration = new DocsBackendIntegration(
  axios.default.create({
    baseURL: process.env.VUE_APP_DOCS_BACKEND_URL,
  })
);

export interface State {
  docsInformation: any[];
  docYaml: string;
  fetchedDocsInformation: boolean;
  searchText: string;
}

export enum DispatchType {
  FetchDocsInformation = 'FETCH_DOCS_INFORMATION',
  SearchDocsInformation = 'SEARCH_DOCS_INFORMATION',
  FetchYaml = 'FETCH_YAML',
}

export enum CommitType {
  SetDocsInformation = 'SET_DOCS_INFORMATION',
  SetSearchText = 'SET_SEARCH_TEXT',
  SetDocYaml = 'SET_DOC_YAML',
}

export const store = new Vuex.Store<State>({
  state: {
    docsInformation: [],
    fetchedDocsInformation: false,
    searchText: '',
    docYaml: '',
  },
  getters: {
    filteredDocsInformation(state) {
      const filteredDocsInformation: any[] = [];
      state.docsInformation.forEach(namespace => {
        const services: any[] = [];
        namespace.services.forEach((service: any) => {
          const serviceStr = JSON.stringify(service);
          if (serviceStr.includes(state.searchText)) {
            services.push(service);
          }
        });
        if (services.length) {
          filteredDocsInformation.push({
            ...namespace,
            services,
          });
        }
      });
      return filteredDocsInformation;
    },
  },
  mutations: {
    [CommitType.SetDocsInformation]: (state, docsInformation: any[]) => {
      state.docsInformation = docsInformation;
      state.fetchedDocsInformation = true;
    },
    [CommitType.SetSearchText]: (state, searchText: string) => {
      state.searchText = searchText;
    },
    [CommitType.SetDocYaml]: (state, yaml: string) => {
      state.docYaml = yaml;
    },
  },
  actions: {
    /**
     * Fetch data from server.
     */
    [DispatchType.FetchDocsInformation]: async ({ commit }): Promise<void> => {
      commit(
        CommitType.SetDocsInformation,
        await docsBackendIntegration.getDocs()
      );
    },

    /**
     * Filter fetched data.
     */
    [DispatchType.SearchDocsInformation]: async (
      { commit },
      searchText: string
    ): Promise<void> => {
      commit(CommitType.SetSearchText, searchText);
    },

    /**
     * Fetch yaml.
     */
    [DispatchType.FetchYaml]: async ({ commit }, docInformation) => {
      commit(
        CommitType.SetDocYaml,
        await docsBackendIntegration.getYaml(docInformation)
      );
    },
  },
});

store.dispatch(DispatchType.FetchDocsInformation);
