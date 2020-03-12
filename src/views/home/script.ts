import { Component, Vue } from 'vue-property-decorator';
import { getHexColorFromString } from '@/helpers/color';
import { docsBackendIntegration } from '@/plugins/store';

@Component
export default class Home extends Vue {
  protected readonly failedImageHrfs: string[] = [];

  showDoc(doctype: any) {
    this.$router.push(doctype.link);
  }

  getColor(service: any): string {
    return getHexColorFromString(service.key);
  }

  getAvatarStr(service: any): string {
    return (service.label as string)
      .split(' ')
      .filter(str => str.length)
      .map(str => str[0])
      .join('')
      .substr(0, 2);
  }

  getIconSrc(service: any): string {
    return service.icon
      ? docsBackendIntegration.getBaseURL(service.icon)
      : null;
  }

  failedToLoadImage(service: any) {
    return this.failedImageHrfs.includes(service.icon);
  }

  onFailToLoadImage(service: any) {
    this.failedImageHrfs.push(service.icon);
  }
}
