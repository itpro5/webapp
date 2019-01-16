const DashboardPage = {
    template: `
        <v-container grid-list-xl text-xs-center>
            <v-layout column>
                <v-flex xs12>
                    <div class="headline">
                        Your site's stats
                    </div>
                </v-flex>
                <v-flex xs12>
                    <v-card class="px-4">
                        <v-layout wrap>
                            <v-flex text-xs-center>
                                <v-card dark color="primary">
                                    <v-card-text>
                                        <div class="display-1 font-weight-medium">10000</div>
                                        <div class="title font-weight-light">Views</div>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex text-xs-center>
                                <v-card dark color="primary">
                                    <v-card-text>
                                        <div class="display-1 font-weight-medium">1</div>
                                        <div class="title font-weight-light">Unique Visitors</div>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex align-self-end>
                                <v-layout wrap fill-height align-center>
                                    <v-flex>
                                        <div class="headline font-weight-light text-truncate">vdeveloperssss.xyziv.com</div>
                                    </v-flex>
                                    <v-flex text-xs-right>
                                        <v-btn icon><v-icon color="primary">visibility</v-icon></v-btn>
                                        <v-btn icon><v-icon color="primary">share</v-icon></v-btn>
                                        <v-btn icon><v-icon color="primary">file_copy</v-icon></v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout>
                            <v-flex text-xs-center>
                                <p>Hello world</p>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    `,
    data: function() {
        return {
            labels: [
                '12',
                '3',
                '6',
                '9',
                '12',
                '3',
                '6',
                '9'
            ],
            value: [
                200,
                675,
                410,
                390,
                310,
                460,
                250,
                240
            ]
        }
    }
}
