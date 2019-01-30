const LandingPage = {
    template: `
        <v-container grid-list-xl text-xs-center fill-height>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-alert :value="true" color="info" outline>
                        <div class="headline">
                            Let's Change The Way We Write & Share our Portfolio/CV
                            in Software Industry... as a Dev Guy
                        </div>
                    </v-alert>
                </v-flex>
                <v-flex xs12 text-xs-left>
                    <v-timeline :dense="$vuetify.breakpoint.xsOnly">
                        <v-timeline-item v-for="(story, index) in timeline_stories" :key="index" color="primary lighten-2" small>
                            <v-card class="elevation-2">
                                <v-card-title class="title">{{story.title}}</v-card-title>
                                <v-card-text class="subheading" v-html="story.desc"></v-card-text>
                            </v-card>
                        </v-timeline-item>
                    </v-timeline>
                </v-flex>
                <v-flex xs12>
                    <div class="headline">
                        It's Time to Begin Your Story
                    </div>
                </v-flex>
                <v-flex xs12>
                    <v-menu offset-y>
                        <v-btn large slot="activator">
                            <v-icon>find_in_page</v-icon>&nbsp;&nbsp;See Example
                        </v-btn>
                        <v-list>
                            <v-list-tile @click="open_new_tab('https://hoangtuan.itpro5.com')">
                                <v-list-tile-title>Portfolio page</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click="open_new_tab('https://hoangtuan.itpro5.com/cv.html')">
                                <v-list-tile-title>CV page</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                    <v-btn large color="primary" @click="github_login">
                        <v-icon>mdi-github-circle</v-icon>
                        &nbsp;&nbsp;Start with GitHub
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    `,
    data: function() {
        return {
            timeline_stories: [
                {
                    title: 'Begin my Story',
                    desc: `Recently, my Company has bidded a banking project that requires providing CV profile for
                            each members of project's team. I realized that I do not have one (that's sound stranged). To be honest,
                            I have been working here since the Company was founded at 2009 by my college's teacher & his friends,
                            so I have never been in an interview and never seriously thought about CV writing.`
                }, {
                    title: 'Find Inspiration',
                    desc: `I surfed the internet to find idea, then I found out a beaufiful CV design template.
                            I'm not a graphic designer, so I decided to learn the basics of HTML/CSS to translate the design
                            into a simple web page. That was a challenge to me because I come from the backend world...
                            but It would be exciting, so <b>JUST DO IT!</b>`
                }, {
                    title: 'Build a Bigger Thing',
                    desc: `I was so happy after finished developing the CV web page after 2 weeks learning HTML/CSS.
                            The page was very simple, non-responsive at all but at least I could write a web page with pure HTML/CSS.
                            But there was a problem when I put all of my working experiences from 2009 into the CV web page, It was so lengthy!
                            With the willingness to learn, I decided to write a portfolio web page that will show all of my experiences.
                            A week later, the portfolio web page was done (thanks <b>W3C-CSS</b> library that bring the responsiveness
                            to my web page without to much efforts).`
                }, {
                    title: 'Think for the Recuiter',
                    desc: `The story does not stop here because I could not send the HTML files to the employers, right.
                            The fish must be in water and the Portfolio/CV page must be somewhere on the internet for
                            people to browse and view its contents. That requirement brings <b>GitHub Pages</b> to life. The principle
                            is simple: you create a GitHub repository with GitHub Pages enabled, then you have
                            an URL (e.g: <b>https://account_name.github.io/repo_name</b>) to browse any content inside that repository, <b>FREELY!<b/>`
                }, {
                    title: 'Personalization',
                    desc: `So far so good, finnaly I have a Portfolio/CV page that lives on internet with ZERO cost.
                            But the URL of the page does not make sense to me. I think the URL should be short and
                            must tell people about its contents. I'm a developer, work in IT industry and I want to
                            introduce my IT profile to others, so a domain named <b>itprofile.com</b> looks good... but
                            <b>itpro5.com</b> is event better.`
                }, {
                    title: 'How about Community',
                    desc: `Having <b>itpro5.com</b> domain for my profile page is awesome, but not fun when I'm alone.
                            The developer community is very huge and maybe some dev guy will also want to have his
                            own domain to point to theis profile web page. It would be fun when I only need the sub-domain
                            <b>my_name.itpro5.com</b> and sharing other sub-domains to the community.
                            And ofcourse, you will have one: <b>your_name.itpro5.com</b>.`
                }, {
                    title: 'Connect the Dots',
                    desc: `With all above ideas, I ended up with this <b>VueJS Web App</b> where <b>you could register your URL
                            and choose a template for your Portfolio/CV page</b> (thanks <b>GitHub, CloudFlare, ZEIT Now Serverless, MongoDB Atlas, Firebase
                            Platform</b> that help me bring all these features to you with ZERO cost). At the end, you have
                            full control to continue to develope your Portfolio/CV page to show your creation with HTML/CSS/JS via GitHub Pull/Push.
                            And when you're ready, just send your <b>itpro5 URL</b> to the recuiters, no more wasting papers, bring
                            conveniention & surprise to the employers.`
                }
            ]
        }
    },
    methods: {
        // Open url in new window
        open_new_tab: function(_url) {
            window.open(_url, '_blank')
        },
        github_login: function() {
            this.$store.dispatch('github_login')
        }
    }
}