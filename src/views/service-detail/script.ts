import { Component, Vue, Watch } from 'vue-property-decorator';
import { DispatchType, docsBackendIntegration } from '@/plugins/store';

@Component
export default class ServiceDetail extends Vue {
  get namespace() {
    const { namespace } = this.$route.params;
    const namespaceData = this.$store.state.docsInformation.find(
      (doc: any) => doc.path === namespace
    );
    return namespaceData;
  }

  get service() {
    if (!this.namespace) {
      return null;
    }
    const { service } = this.$route.params;
    const serviceData = this.namespace.services.find(
      (data: any) => data.path === service
    );
    return serviceData;
  }

  get doctype() {
    if (!this.service) {
      return null;
    }
    const { doctype } = this.$route.params;
    const doctypeData = this.service.doctypes.find(
      (data: any) => data.path === doctype
    );
    return doctypeData;
  }

  get types() {
    if (!this.service) {
      return [];
    }
    return this.service.doctypes.map((doctype: any) => doctype.type);
  }

  onChangeType(type: string) {
    const doctype = this.service.doctypes.find(
      (data: any) => data.type === type
    );
    if (doctype) {
      this.$router.push(doctype.link);
    }
  }

  get colorTheme() {
    return process.env.VUE_APP_THEME_COLOR;
  }

  @Watch('doctype')
  async onChangeDoctype() {
    await this.initDoc();
  }

  protected async initDoc() {
    if (!this.doctype) {
      return this.$router.push('/');
    }
    const activeType = this.doctype.type.toLowerCase();
    if (activeType === 'asyncapi') {
      await this.$store.dispatch(DispatchType.FetchYaml, this.doctype);
    }
    // @ts-ignore
    window.generator({
      activeType,
      asyncapiElement: '#asyncapi',
      asyncapiYaml: this.$store.state.docYaml,
      openapiElement: '#openapi',
      openapiUrl: docsBackendIntegration.getBaseURL(this.doctype.location),
    });
  }

  protected async mounted() {
    await this.initDoc();
  }
}
