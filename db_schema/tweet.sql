CREATE TABLE "user" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''user_id_seq''::regclass)',
	"name" VARCHAR NULL DEFAULT NULL,
    "tweets" VARCHAR NULL DEFAULT NULL,
    "followers" VARCHAR NULL DEFAULT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE "tweet" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''user_id_seq''::regclass)',
	"tittle" VARCHAR NULL DEFAULT NULL,
	"content" VARCHAR NULL DEFAULT NULL,
	"user_id" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE "follower" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''user_id_seq''::regclass)',
	"user_id" INTEGER NULL DEFAULT NULL,
	"follower_user_id" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id")
);