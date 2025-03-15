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
export declare enum CustomisationSource {
    QUEST = "quest",
    PRESTIGE = "prestige",
    ACHIEVEMENT = "achievement",
    UNLOCKED_IN_GAME = "unlockedInGame",
    PAID = "paid",
    DROP = "drop",
    DEFAULT = "default"
}
