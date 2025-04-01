export interface ICustomisationStorage {
    id: string;
    source: CustomisationSource;
    type: CustomisationType;
}
export declare enum CustomisationType {
    SUITE = "suite",
    DOG_TAG = "dogTag",
    HEAD = "head",
    VOICE = "voice",
    GESTURE = "gesture",
    ENVIRONMENT = "environment",
    WALL = "wall",
    FLOOR = "floor",
    CEILING = "ceiling",
    LIGHT = "light",
    SHOOTING_RANGE_MARK = "shootingRangeMark",
    CAT = "cat",
    MANNEQUIN_POSE = "mannequinPose"
}
export declare enum CustomisationTypeId {
    CUSTOMIZATION = "5cbdb4a2e2b501000d352ae2",
    BODY_PARTS = "5cd943c31388ce000a659df5",
    BODY = "5cc0868e14c02e000c6bea68",
    FEET = "5cc0869814c02e000a4cad94",
    HANDS = "5cc086a314c02e000c6bea69",
    HEAD = "5cc085e214c02e000c6bea67",
    SUITS = "5cd943b21388ce03a44dc2a2",
    LOWER = "5cd944d01388ce000a659df9",
    UPPER = "5cd944ca1388ce03a44dc2a4",
    DOG_TAGS = "6746fafabafff8500804880e",
    VOICE = "5fc100cf95572123ae738483",
    GESTURES = "6751848eba5968fd800a01d6",
    ENVIRONMENT_UI = "67584ea0ff58ff0e7909e435",
    FLOOR = "67373f170eca6e03ab0d5391",
    ITEM_SLOT = "67373f520eca6e03ab0d5397",
    LIGHT = "67373f286cadad262309e862",
    POSTER_SLOT = "67373f4b5a5ee73f2a081bb3",
    SHOOTING_RANGE_MARK = "67373f330eca6e03ab0d5394",
    WALL = "67373f1e5a5ee73f2a081baf",
    HIDEOUT = "67373ef90eca6e03ab0d538c",
    CEILING = "673b3f595bf6b605c90fcdc2",
    MANNEQUIN_POSE = "675ff48ce8d2356707079617"
}
export declare enum CustomisationSource {
    QUEST = "quest",
    PRESTIGE = "prestige",
    ACHIEVEMENT = "achievement",
    UNLOCKED_IN_GAME = "unlockedInGame",
    PAID = "paid",
    DROP = "drop",
    DEFAULT = "default"
}
