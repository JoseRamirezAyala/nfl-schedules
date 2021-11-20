
const processNflFeed = (data) => {
    const events = data.events;
    let games = [];
    events.forEach(event => {
        event.competitions.forEach(competition => {
            let game = {
                date: '',
                venue: '',
                name: '',
                shortName: '',
                awayTeam: {
                    name: '',
                    score: 0
                },
                homeTeam: {
                    name: '',
                    score: 0
                }
            };
            game.date = competition.date;
            game.venue = competition.venue.fullName;
            game.name = event.name;
            game.shortName = event.shortName;
            const competitors = competition.competitors.map(competitor => {
                return {
                    teamName: competitor.team.name,
                    score: competitor.score
                }
            });
            game.homeTeam.name = competitors[0].teamName;
            game.homeTeam.score = competitors[0].score;
            game.awayTeam.name = competitors[1].teamName;
            game.awayTeam.score = competitors[1].score;
            games.push(game);
        })
    });
    return games;
}


module.exports = {
    processNflFeed: processNflFeed
}