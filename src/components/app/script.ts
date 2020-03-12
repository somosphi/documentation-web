import { Vue, Component } from 'vue-property-decorator';
import { DispatchType } from '../../plugins/store/index';

@Component
export default class App extends Vue {
  get appTitle() {
    return process.env.VUE_APP_TITLE.toUpperCase();
  }

  get colorTheme() {
    return process.env.VUE_APP_THEME_COLOR;
  }

  protected goBack() {
    this.$router.push('/');
  }

  protected onChangeSearchText(searchText: string) {
    this.$store.dispatch(DispatchType.SearchDocsInformation, searchText);
  }
}
