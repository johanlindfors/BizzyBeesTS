const COLUMN_TOP = 150;
const NUMBER_OF_FLOWER_COLORS = 6;
const RAINBOW_FLOWER_COLOR = 6;
const FLOWER_DELTA_Y = 80;
const FLOWER_WIDTH = 72;
const FLOWER_HEIGHT = 72;
const COLUMN_BOTTOM = 620;
const INITAL_VELOCITY = 0.4;
const FLOWER_COLUMN_WIDTH = 92;
const FLOWER_COLUMN_MARGIN = 22;

const TEXTURE_BACKGROUND = "backgroundTexture";
const TEXTURE_FOREGROUND = "foregroundTexture";
const TEXTURE_FLOWER_MAP = "flowerMap";
const TEXTURE_BEE_MAP = "beeMap";
const TEXTURE_HUD = "hudBackground";
const TEXTURE_PRELOADBAR = "preloadBar";

const BEE_DELTA_X = 96;
const BEE_START_X = 5;
const BEE_START_Y = 700;
const NUMBER_OF_BEE_COLORS = NUMBER_OF_FLOWER_COLORS - 1;

const FONT_SMALL = { font: "24px Arial", fill: "#000" };
const FONT_MEDIUM = { font: "30px Arial", fill: "#000" };
const FONT_LARGE = { font: "36px Arial", fill: "#000" };
const FONT_HUGE = { font: "46px Arial", fill: "#000", fontWeight: "bold"};

const STATE_GAME = "GameState";
const STATE_PRELOADER = "PreloaderState";
const STATE_BOOT = "BootState";
const STATE_GAME_OVER = "GameOverState";