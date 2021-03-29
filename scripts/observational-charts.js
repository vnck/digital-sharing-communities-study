window.onloadFuncs.push(() => {
    Chart.plugins.register(ChartDataLabels);
    Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
        color: '#111111',
        font: {size: 9,},
        anchor: 'end',
        clamp: true,
        align: 'top',
        offset: -3,
      });
    let townDistribution = new Chart(
        document.getElementById('townDistribution').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Punggol', 'Toa Payoh', 'Jurong'],
                datasets: [{
                    label: '',
                    data: [37,18,26],
                    backgroundColor: [
                        'mediumslateblue','salmon','mediumseagreen'
                    ],
                }]
            },
            options: {
                aspectRatio: 0.6,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false,
                    onClick: null
                },
                title: {
                    display: true,
                    text: 'Figure 1: Distribution of Digital Communities across Towns'
                }
            }
        }
    )

    let platformDistribution = new Chart(
        document.getElementById('platformDistribution').getContext('2d'), {
            type: 'horizontalBar',
            data: {
                labels: ['Punggol', 'Toa Payoh', 'Jurong'],
                datasets: [{
                    label: 'Facebook',
                    data: [17,7,7],
                    backgroundColor: [
                        'royalblue','royalblue','royalblue'
                    ],
                }, {
                    label: 'Instagram',
                    data: [6,4,8],
                    backgroundColor: [
                        'mediumvioletred','mediumvioletred','mediumvioletred'
                    ],
                }, {
                    label: 'Telegram',
                    data: [10,6,10],
                    backgroundColor: [
                        'mediumturquoise','mediumturquoise','mediumturquoise'
                    ],
                }, {
                    label: 'WhatsApp',
                    data: [4,1,1],
                    backgroundColor: [
                        'mediumseagreen','mediumseagreen','mediumseagreen'
                    ],
                }]
            },
            options: {
                aspectRatio: 3,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                        stacked: true,
                    }],
                    yAxes: [{stacked: true}],
                },
                title: {
                    display: true,
                    text: 'Figure 2: Distribution of Digital Communities across Platforms'
                },
                tooltips: {
                    mode: 'label',
                    callbacks: {
                        afterTitle: function() {
                            window.total = 0;
                        },
                        label: function(tooltipItem, data) {
                            var corporation = data.datasets[tooltipItem.datasetIndex].label;
                            var valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            window.total += valor;
                            return corporation + ": " + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");             
                        },
                        footer: function() {
                            return "Total: " + window.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        }
                    }
                },
                plugins: {
                    datalabels: {
                      align: 'left',
                      offset: -1
                    }
                }
            }
        }
    )

    let platformTimeSeries = new Chart(
        document.getElementById('platformTimeSeries').getContext('2d'), {
            type: 'line',
            data: {
                labels: [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
                datasets: [{
                    label: 'Facebook',
                    data: [1,1,1,1,1,1,'',4,6,3,3,1,8,''],
                    backgroundColor: 'royalblue',
                    borderColor: 'royalblue',
                    fill: false,
                },
                {
                    label: 'Instagram',
                    data: ['','','','',1,1,'','',1,1,3,1,8,2],
                    backgroundColor: 'mediumvioletred',
                    borderColor: 'mediumvioletred',
                    fill: false,
                },
                {
                    label: 'Telegram',
                    data: ['','','','','','','','',1,1,2,9,10,3],
                    backgroundColor: 'mediumturquoise',
                    borderColor: 'mediumturquoise',
                    fill: false,
                },
                {
                    label: 'WhatsApp',
                    data: ['','','','','','','','','','','','',6,''],
                    backgroundColor: 'palevioletred',
                    borderColor: 'palevioletred',
                    fill: false,
                }
            ]},
            options: {
                title: {
                    display: true,
                    text: 'Figure 3: Year of Creation of Digital Sharing Communities'
                },
            }
        }
    )

    let purposeDistribution = new Chart(
        document.getElementById('purposeDistribution').getContext('2d'), {
            type: 'horizontalBar',
            data: {
                labels: ['Punggol', 'Toa Payoh', 'Jurong'],
                datasets: [{
                    label: 'Residential',
                    data: [14,7,11],
                    backgroundColor: [
                        'cornflowerblue','cornflowerblue','cornflowerblue'
                    ],
                }, {
                    label: 'BTO',
                    data: [6,2,2],
                    backgroundColor: [
                        'turquoise','turquoise','turquoise'
                    ],
                }, {
                    label: 'Interest Group',
                    data: [5,5,3],
                    backgroundColor: [
                        'plum','plum','plum'
                    ],
                }, {
                    label: 'Groupbuys',
                    data: [11,4,7],
                    backgroundColor: [
                        'palevioletred','palevioletred','palevioletred'
                    ],
                }, {
                    label: 'Community Market',
                    data: [1,'',3],
                    backgroundColor: [
                        'sandybrown','sandybrown','sandybrown'
                    ],
                }]
            },
            options: {
                aspectRatio: 2.6,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                        stacked: true,
                    }],
                    yAxes: [{stacked: true}],
                },
                title: {
                    display: true,
                    text: 'Figure 4: Distribution of Community Purpose across Towns'
                },
                tooltips: {
                    mode: 'label',
                    callbacks: {
                        afterTitle: function() {
                            window.total = 0;
                        },
                        label: function(tooltipItem, data) {
                            var corporation = data.datasets[tooltipItem.datasetIndex].label;
                            var valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            window.total += valor;
                            return corporation + ": " + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");             
                        },
                        footer: function() {
                            return "Total: " + window.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        }
                    }
                },
                plugins: {
                    datalabels: {
                      align: 'left',
                      offset: -1
                    }
                }
            }
        }
    )

    let purposeTimeSeries = new Chart(
        document.getElementById('purposeTimeSeries').getContext('2d'), {
            type: 'line',
            data: {
                labels: [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
                datasets: [{
                    label: 'Residential',
                    data: ['','',1,1,2,1,'',3,5,4,5,6,4,''],
                    backgroundColor: 'cornflowerblue',
                    borderColor: 'cornflowerblue',
                    fill: false,
                },
                {
                    label: 'BTO',
                    data: ['','','','','','','','','',1,'',4,4,1],
                    backgroundColor: 'turquoise',
                    borderColor: 'turquoise',
                    fill: false,
                },
                {
                    label: 'Interest Group',
                    data: [1,1,'','','','','',1,2,'',3,'',4,''],
                    backgroundColor: 'plum',
                    borderColor: 'plum',
                    fill: false,
                },
                {
                    label: 'Groupbuys',
                    data: ['','','','','','','','','','','','',18,4],
                    backgroundColor: 'palevioletred',
                    borderColor: 'palevioletred',
                    fill: false,
                },
                {
                    label: 'Community Market',
                    data: ['','','','','',1,'','','','','','',2,''],
                    backgroundColor: 'sandybrown',
                    borderColor: 'sandybrown',
                    fill: false,
                },
            ]},
            options: {
                title: {
                    display: true,
                    text: 'Figure 5: Year of Creation of Digital Sharing Communities'
                },
            }
        }
    )

    let placeSpecificityGroup = new Chart(
        document.getElementById('placeSpecificityGroup').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Punggol', 'Toa Payoh', 'Jurong'],
                datasets: [{
                    label: 'Estate',
                    data: [26,4,7],
                    backgroundColor: [
                        'plum','plum','plum'
                    ],
                }, {
                    label: 'Town',
                    data: [7, 12, 15],
                    backgroundColor: [
                        'mediumpurple','mediumpurple','mediumpurple'
                    ],
                }, {
                    label: 'Region',
                    data: [4, 2, 4],
                    backgroundColor: [
                        'darkslateblue','darkslateblue','darkslateblue'
                    ],
                }]
            },
            options: {
                aspectRatio: .7,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                }]},
                title: {
                    display: true,
                    text: 'Figure 6: Distribution of Communities by Place Specificity'
                }
            }
        }
    )

    let placeSpecificityMember = new Chart(
        document.getElementById('placeSpecificityMember').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Punggol', 'Toa Payoh', 'Jurong'],
                datasets: [{
                    label: 'Estate',
                    data: [865, 618, 295],
                    backgroundColor: [
                        'plum','plum','plum'
                    ],
                }, {
                    label: 'Town',
                    data: [1342, 283, 746],
                    backgroundColor: [
                        'mediumpurple','mediumpurple','mediumpurple'
                    ],
                }, {
                    label: 'Region',
                    data: [4962, 779, 426],
                    backgroundColor: [
                        'darkslateblue','darkslateblue','darkslateblue'
                    ],
                }]
            },
            options: {
                aspectRatio: .7,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Figure 7: Mean Size of Communities by Place Specificity'
                }
            }
        }
    )

    let accessibilitySpecificity = new Chart(
        document.getElementById('accessibilitySpecificity').getContext('2d'), {
            type: 'horizontalBar',
            data: {
                labels: ['Estate', 'Town', 'Region'],
                datasets: [{
                    label: 'Open',
                    data: [18, 28, 8],
                    backgroundColor: [
                        'mediumaquamarine','mediumaquamarine','mediumaquamarine'
                    ],
                }, {
                    label: 'Open with Verification',
                    data: [2, 1, 1],
                    backgroundColor: [
                        'mediumseagreen','mediumseagreen','mediumseagreen'
                    ],
                }, {
                    label: 'Closed with Permission',
                    data: [8, 5, 1],
                    backgroundColor: [
                        'orange','orange','orange'
                    ],
                }, {
                    label: 'Closed with Verification',
                    data: [9,'',''],
                    backgroundColor: [
                        'orangered','orangered','orangered'
                    ],
                }]
            },
            options: {
                aspectRatio: 2,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                }]},
                title: {
                    display: true,
                    text: 'Figure 8: No. of Communities by Place Specificity and Accessibility'
                },
                tooltips: {
                    mode: 'label',
                    callbacks: {
                        afterTitle: function() {
                            window.total = 0;
                        },
                        label: function(tooltipItem, data) {
                            var corporation = data.datasets[tooltipItem.datasetIndex].label;
                            var valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            window.total += valor;
                            return corporation + ": " + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");             
                        },
                        footer: function() {
                            return "Total: " + window.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        }
                    }
                },
                plugins: {
                    datalabels: {
                      align: 'right',
                      offset: 0
                    }
                }
            }
        }
    )

    let accessibilitySize = new Chart(
        document.getElementById('accessibilitySize').getContext('2d'), {
            type: 'horizontalBar',
            data: {
                labels: ['Estate', 'Town', 'Region'],
                datasets: [{
                    label: 'Open',
                    data: [532, 786, 2105],
                    backgroundColor: [
                        'mediumaquamarine','mediumaquamarine','mediumaquamarine'
                    ],
                }, {
                    label: 'Open with Verification',
                    data: [702, 671, 817],
                    backgroundColor: [
                        'mediumseagreen','mediumseagreen','mediumseagreen'
                    ],
                }, {
                    label: 'Closed with Permission',
                    data: [678, 262, 5456],
                    backgroundColor: [
                        'orange','orange','orange'
                    ],
                }, {
                    label: 'Closed with Verification',
                    data: [1181, '', ''],
                    backgroundColor: [
                        'orangered','orangered','orangered'
                    ],
                }]
            },
            options: {
                aspectRatio: 2,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                }]},
                title: {
                    display: true,
                    text: 'Figure 9: Mean Size of Communities by Place Specificity and Accessibility'
                },
                tooltips: {
                    mode: 'label',
                    callbacks: {
                        afterTitle: function() {
                            window.total = 0;
                        },
                        label: function(tooltipItem, data) {
                            var corporation = data.datasets[tooltipItem.datasetIndex].label;
                            var valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            window.total += valor;
                            return corporation + ": " + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");             
                        },
                        footer: function() {
                            return "Total: " + window.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        }
                    }
                },
                plugins: {
                    datalabels: {
                      align: 'right',
                      offset: 0
                    }
                }
            }
        }
    )

    let purposeOrg = new Chart(
        document.getElementById('purposeOrg').getContext('2d'), {
            type: 'horizontalBar',
            data: {
                labels: ['BTO', 'Residential', 'Groupbuy', 'Interest Group','Community Market'],
                datasets: [{
                    label: 'Flat Hierarchy',
                    data: [9,15,2,8,2],
                    backgroundColor: [
                        'mediumaquamarine','mediumaquamarine','mediumaquamarine','mediumaquamarine','mediumaquamarine'
                    ],
                }, {
                    label: 'Hierarchical',
                    data: [8,1,7,5,2],
                    backgroundColor: [
                        'orange','orange','orange','orange','orange'
                    ],
                }, {
                    label: 'One-Way',
                    data: ['',8,13,'',''],
                    backgroundColor: [
                        'orangered','orangered','orangered','orangered','orangered'
                    ],
                }]
            },
            options: {
                aspectRatio: 2.6,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                        stacked: true,
                    }],
                    yAxes: [{stacked: true}],
                },
                title: {
                    display: true,
                    text: 'Figure 10: Organisation Structure of Communities by Purpose'
                },
                tooltips: {
                    mode: 'label',
                    callbacks: {
                        afterTitle: function() {
                            window.total = 0;
                        },
                        label: function(tooltipItem, data) {
                            var corporation = data.datasets[tooltipItem.datasetIndex].label;
                            var valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            window.total += valor;
                            return corporation + ": " + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");             
                        },
                        footer: function() {
                            return "Total: " + window.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        }
                    }
                },
                plugins: {
                    datalabels: {
                        align: 'left',
                        offset: -1
                    }
                }
            }
        }
    )
});