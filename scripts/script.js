new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "宿命",
          artist: "Official髭男dism",
          cover: "./img/syukumei.jpg",
          source: "./mp3/syukumei.mp3",
          url: "https://youtu.be/-kgOFJG881I",
          favorited: false
        },
        {
          name: "Pritender",
          artist: "Official髭男dism",
          cover: "./img/pritender.jpg",
          source: "./mp3/pritender.mp3",
          url: "https://youtu.be/TQ8WlA2GXbk",
          favorited: false
        },
        {
          name: "馬と鹿",
          artist: "米津玄師",
          cover: "./img/umatosika.jpg",
          source: "./mp3/umatosika.mp3",
          url: "https://youtu.be/ptnYBctoexk",
          favorited: false
        },
        {
          name: "ノーダウト",
          artist: "Official髭男dism",
          cover: "./img/nodoubt.jpg",
          source: "./mp3/nodoubt.mp3",
          url: "https://youtu.be/EHw005ZqCXk",
          favorited: false
        },
        {
          name: "白日",
          artist: "King Gnu",
          cover: "./img/hakuzitu.jpg",
          source: "./mp3/hakuzitu.mp3",
          url: "https://www.youtube.com/watch?v=ony539T074w",
          favorited: false
        },
        {
          name: "まちがいさがし",
          artist: "菅田将暉",
          cover: "./img/1.jpg",
          source: "./mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=7940nuwCEYA",
          favorited: false
        },
        {
          name: "灰色と青",
          artist: "米津玄師×菅田将暉",
          cover: "./img/2.jpg",
          source: "./mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=gJX2iy6nhHc",
          favorited: true
        },
        {
          name: "Lemon",
          artist: "米津玄師",
          cover: "./img/3.jpg",
          source: "./mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=SX_ViT4Ra7k",
          favorited: false
        },
        // {
        //   name: "さよならエナジー",
        //   artist: "菅田将暉",
        //   cover: "./img/4.jpg",
        //   source: "./mp3/4.mp3",
        //   url: "https://www.youtube.com/watch?v=XSkpuDseenY",
        //   favorited: false
        // },
        {
          name: "Loser",
          artist: "米津玄師",
          cover: "./img/5.jpg",
          source: "./mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=Dx_fKPBPYUI",
          favorited: true
        },
        {
          name: "orion",
          artist: "米津玄師",
          cover: "./img/6.jpg",
          source: "./mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=lzAyrgSqeeE",
          favorited: false
        },
        {
          name: "Flamingo",
          artist: "米津玄師",
          cover: "./img/7.jpg",
          source: "./mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=Uh6dkL1M9DM",
          favorited: false
        },
        {
          name: "打ち上げ花火",
          artist: "DAOKO×米津玄師",
          cover: "./img/8.jpg",
          source: "./mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=-tKVN2mAKRI",
          favorited: false
        },
        // {
        //   name: "ピースサイン",
        //   artist: "米津玄師",
        //   cover: "./img/9.jpg",
        //   source: "./mp3/9.mp3",
        //   url: "https://www.youtube.com/watch?v=9aJVr5tTTWk",
        //   favorited: false
        // },
        // {
        //   name: "メトロノーム",
        //   artist: "米津玄師",
        //   cover: "./img/10.jpg",
        //   source: "./mp3/10.mp3",
        //   url: "https://www.youtube.com/watch?v=Qa9PkDZkyHg",
        //   favorited: false
        // },
        {
          name: "パプリカ",
          artist: "米津玄師",
          cover: "./img/11.jpg",
          source: "./mp3/11.mp3",
          url: "https://www.youtube.com/watch?v=s582L3gujnw",
          favorited: false
        },
        {
          name: "アイネクライネ",
          artist: "米津玄師",
          cover: "./img/12.jpg",
          source: "./mp3/12.mp3",
          url: "https://www.youtube.com/watch?v=-EKxzId_Sj4",
          favorited: false
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    // shuffleTrack() {
    //   this.transitionName = "scale-shuffle";
    //   this.isShowCover = false;
    //   this.tracks = _.shuffle(this.tracks)
    //   this.currentTrack = this.tracks[this.currentTrackIndex];
    //   this.resetPlayer();
    // },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
