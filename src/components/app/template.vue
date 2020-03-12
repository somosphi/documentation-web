<template>
  <v-app>
    <v-app-bar
      :elevation="$route.name !== 'service-detail' ? 4 : 0"
      app
      absolute
      :color="colorTheme"
      dark
      scroll-target="#scrolling-techniques"
    >
      <v-btn v-if="$route.name === 'service-detail'" small icon @click="goBack">
        &nbsp;
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{ appTitle }}</span>&nbsp;
        <span class="font-weight-light">DOCS</span>
      </v-toolbar-title>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-text-field
        v-if="$route.name !== 'service-detail'"
        style="margin-top: 20px; max-width: 50%"
        placeholder="Pesquisar"
        append-icon="mdi-magnify"
        clearable
        @input="onChangeSearchText"
        :value="$store.state.searchText"
      ></v-text-field>
    </v-app-bar>
    <v-content v-if="$store.state.fetchedDocsInformation">
      <router-view />
    </v-content>
    <v-container v-else fluid :fill-height="!$store.state.fetchedDocsInformation">
      <v-layout align-center justify-center>
        <v-flex text-center>
          <v-progress-circular indeterminate />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script src="./script.ts"/>
<style src="./style.css"/>
