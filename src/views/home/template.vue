<template>
  <v-container fluid>
    <v-layout v-for="doc in $store.getters.filteredDocsInformation" :key="doc.key" align-center>
      <v-flex>
        <v-subheader>{{ doc.label }}</v-subheader>
        <v-row sm="12">
          <v-col
            v-for="(service, index) in doc.services"
            :key="index"
            sm="12"
            md="4"
            lg="3"
            cols="12"
          >
            <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div v-if="service.version" class="overline mb-4">{{ service.version }}</div>
                  <v-list-item-title class="subtitle-1 mb-1">{{ service.label }}</v-list-item-title>
                  <v-list-item-subtitle>{{ service.description || service.path }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-avatar :color="getColor(service)">
                  <img
                    v-if="!failedToLoadImage(service) && service.icon"
                    :src="getIconSrc(service)"
                    alt="avatar"
                    @error="onFailToLoadImage(service)"
                  />
                  <span v-else class="white--text headline">{{ getAvatarStr(service) }}</span>
                </v-avatar>
              </v-list-item>
              <v-card-actions align-center justify-center>
                <v-layout>
                  <v-btn
                    v-for="doctype in service.doctypes"
                    :key="doctype.type"
                    small
                    text
                    v-on:click="showDoc(doctype)"
                  >{{ doctype.type }}</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src="./script.ts" />
