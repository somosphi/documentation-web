<template>
  <div v-if="doctype">
    <v-tabs fixed-tabs :background-color="colorTheme" dark elevation="4" :value="doctype.type">
      <v-tab
        v-for="type in types"
        :key="type"
        :href="`#${type}`"
        v-on:click="onChangeType(type)"
      >{{ type }}</v-tab>
    </v-tabs>
    <div v-show="doctype.type === 'ASYNCAPI'" id="asyncapi" />
    <div v-show="doctype.type === 'OPENAPI'" id="openapi" />
  </div>
</template>
<script src="./script.ts" />
