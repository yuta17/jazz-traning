(function attachJazzStandards(global) {
  "use strict";

  const jazzStandards = {
    priority31: [
      "All of Me", "All the Things You Are", "Autumn Leaves", "Body and Soul",
      "Bye Bye Blackbird", "Days of Wine and Roses", "Donna Lee", "Georgia on My Mind",
      "How High the Moon", "I Got Rhythm", "In a Mellow Tone", "Just Friends", "Laura",
      "Misty", "Night and Day", "Night in Tunisia", "Oh, Lady Be Good!",
      "On Green Dolphin Street", "Out of Nowhere", "Round Midnight", "Satin Doll",
      "Softly, As in a Morning Sunrise", "Star Eyes", "Stella by Starlight", "Summertime",
      "Sweet Georgia Brown", "Take the A Train", "There Will Never Be Another You",
      "What Is This Thing Called Love?", "Willow Weep for Me", "Yardbird Suite",
    ],
    next47: [
      "Ain’t Misbehavin’", "Alone Together", "Autumn in New York", "Billie’s Bounce",
      "Blue Bossa", "Blue Monk", "But Not For Me", "C Jam Blues", "Cherokee",
      "Embraceable You", "Fly Me to the Moon", "The Girl From Ipanema", "Groovin’ High",
      "Have You Met Miss Jones?", "Here’s That Rainy Day", "I Can’t Get Started",
      "I Got It Bad", "I Remember Clifford", "I’ll Remember April", "Impressions",
      "It Could Happen to You", "Jitterbug Waltz", "Like Someone in Love", "Love for Sale",
      "Lover Man", "Lullaby of Birdland", "Mack the Knife", "My Funny Valentine",
      "One Note Samba", "Over the Rainbow", "Pennies From Heaven", "Perdido",
      "Prelude to a Kiss", "St. Thomas", "Scrapple From the Apple", "Skylark", "So What",
      "Solar", "Someone to Watch Over Me", "Song for My Father", "Sophisticated Lady",
      "Star Dust", "Stormy Weather", "Tenderly", "There Is No Greater Love", "Wave",
      "Yesterdays",
    ],
    fourHit76: [
      "All Blues", "Angel Eyes", "Blue Moon", "Bluesette", "But Beautiful", "Caravan",
      "Come Rain or Come Shine", "Confirmation", "Corcovado", "Darn That Dream",
      "Desafinado", "Do Nothing ‘Til You Hear From Me", "Don’t Get Around Much Anymore",
      "Doxy", "East of the Sun", "Easy Living", "Four", "Giant Steps",
      "God Bless the Child", "Gone With the Wind", "I Didn’t Know What Time It Was",
      "I Let a Song Go Out of My Heart", "I Remember You", "I Should Care",
      "I Thought About You", "If You Could See Me Now", "Indiana", "Invitation",
      "It Might As Well Be Spring", "Joy Spring", "Lady Bird", "Lover",
      "Lover, Come Back to Me", "Maiden Voyage", "The Man I Love",
      "Manha de Carnaval (Black Orpheus)", "Mean to Me", "Meditation", "Milestones (new)",
      "Moment’s Notice", "Moonlight In Vermont", "My Favorite Things", "My Foolish Heart",
      "My Old Flame", "My One and Only Love", "My Romance", "Naima",
      "The Nearness of You", "Nice Work If You Can Get It", "Old Folks", "Once I Loved",
      "Ornithology", "Our Love Is Here to Stay", "Polka Dots and Moonbeams",
      "Shiny Stockings", "Smoke Gets In Your Eyes", "Someday My Prince Will Come",
      "The Song Is You", "Speak Low", "Stompin’ at the Savoy", "Straight, No Chaser",
      "Sugar", "Take Five", "Tangerine", "Tea for Two", "These Foolish Things",
      "Things Ain’t What They Used to Be", "Time After Time", "Tune Up",
      "The Way You Look Tonight", "Well, You Needn’t", "What’s New?", "Work Song",
      "You Don’t Know What Love Is", "You Stepped Out of a Dream",
      "You’d Be So Nice To Come Home To",
    ],
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { jazzStandards };
  }

  global.JazzStandards = jazzStandards;
})(typeof window !== "undefined" ? window : globalThis);
