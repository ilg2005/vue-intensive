var Membership;
(function (Membership) {
    Membership[Membership["Basic"] = 0] = "Basic";
    Membership[Membership["Standard"] = 1] = "Standard";
    Membership[Membership["Premium"] = 2] = "Premium";
})(Membership || (Membership = {}));
var membership = Membership.Standard;
var membershipReverse = Membership[1];
console.log(membership, membershipReverse);
var SocialMedia;
(function (SocialMedia) {
    SocialMedia["VK"] = "VKontakte";
    SocialMedia["FB"] = "Facebook";
    SocialMedia["IG"] = "Instagram";
})(SocialMedia || (SocialMedia = {}));
var social = SocialMedia.FB;
console.log(social);
