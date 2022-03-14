enum Membership {
    Basic,
    Standard,
    Premium
}

const membership = Membership.Standard
const membershipReverse = Membership[1]

console.log(membership, membershipReverse)

enum SocialMedia {
    VK = 'VKontakte',
    FB = 'Facebook',
    IG = 'Instagram'
}

const social = SocialMedia.FB
console.log(social)
