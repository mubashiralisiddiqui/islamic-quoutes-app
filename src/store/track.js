import { observable } from 'mobx';

class Track {
  @observable id ;
  @observable title;
  @observable artist;
  @observable artwork;
  @observable content;
  @observable color;
  @observable content_source;
}

export default new Track();