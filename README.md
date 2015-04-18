# Ludum Dare 32

Ludum Dare 32 Competition Entry

## ABC Worriers

Earth is being invaded by aliens and only you can stop them!

Your weapons are:

**The Atom Bomb Destroy** everything in the blast radius! Be warned, distant enemies may become… strange.

**The Biological Virus** Create viral bugs and set them set on the aliens. Be warned, some bugs may make the aliens stronger.

**The Chemicals** Use your chemistry skills to create strange weapons of your own and fight off the aliens your self!

All in the name of science!

## Core Game Play

Top down 2D game.

There are four bases, three are labs, one contains the last civilians which must be protected. Each lab allows the player to make or use one of the weapons above.

The biological and chemical weapons can be built from differing objects lying around the map. These combine to create different effects.

The A bomb is available on a timer. When it goes off it wipes out nearby aliens but mutates any on the edges of the map. The mutation randomises the stats of the aliens.

Tactics will involve building a chemical weapon so you can explore the map to pick up parts to create biological weapons. When things get too much, employ the nuclear option.

Last as long as you can with score based on how many aliens you kill. Achievements unlocked based on things like destroying everything on the map, creating different combinations of things etc.

## Aliens

The alien stats which can be affected by weapons are:

- **Strength** How many survivors they kill if they get in the base.
- **Speed** How fast they move.
- **Toughness** How much damage they can take before they die.
- **Smarts** The alien's AI.

Aliens can also gain random weapons based on the chemical weapons if they mutate.

## AI

The AI has two properties which determines how it behaves. These are:

- **Target** What it wants. An object or point on the map.
- **Aggression** How actively it goes after its target.

sloth - moves aimlessly, attacks anything nearby
hunter - goes after the player
aggressor - goes after the humans
crazy - randomly wanders and attacks

## Chemical Weapons

Chemical weapons are built from a number of different components which can be found on the map. These are combined to form the stats of the weapon. These are:

- **Type** Type of attack, one of *spray*, *single shot*, *cloud*.
- **Range** How far the weapon can fire.
- **Damage** How much damage the weapon does.
- **Duration** How long the damage lasts.
- **Mutation** How likely the target is to mutate.
- **Ammo** How many shots before you run out and need to create a new weapon.

A weapon is built from one *Type* and two *Chemicals*.

## Biological Weapons

Biological weapons (or Bugs) are built in a similar manner to chemical weapons from some of the same parts. Bug have the following stats:

- **Growth Rate** How quickly you can grow them.
- **Quantity** How many are grown.
- **Strength** How many aliens they kill when they get to them.
- **Speed** How fast they move.
- **Toughness** How much damage they can take before they die.
- **Smarts** The bug's AI.

Bugs work in a similar manner to the aliens in that they have a target (the aliens) and they will go after them based on their AI.

A bug is built from two to three *Chemicals* which have a direct effect on the bug's stats.

## Types

The *Types* available for pick up are *gun*, *spray can* and *smoke grenade*. To cut down on required assets these shouldn't change the character animation. The differ in the following ways:

- **Gun** Single shot, attacks one enemy.
- **Spray Can** Cone of effect, attacks multiple enemies.
- **Smoke Grenade** Creates a cloud some distance from the player which remains for a few seconds.

The type will also have an impact on the weapon's range.

## Chemicals

Chemicals are used to create weapons and bugs and have the following stats, depending on how they're used:

- **Range (weapon)** How far the weapon can fire.
- **Damage (weapon)** How much damage the weapon does.
- **Duration (weapon)** How long the damage lasts.
- **Mutation (weapon)** How likely the target is to mutate.
- **Ammo (weapon)** How many shots before you run out and need to create a new weapon.
- **Growth Rate (bug)** How quickly you can grow them.
- **Quantity (bug)** How many are grown.
- **Strength (bug)** How many aliens they kill when they get to them.
- **Speed (bug)** How fast they move.
- **Toughness (bug)** How much damage they can take before they die.
- **Smarts (bug)** The bug's AI.

The number of chemicals should be quite restricted (say six) just to keep it simple to play and simple to build. Chemical data will be store in a JSON object.

## Player Stats

The player has a fixed movement speed with attack based on the *Chemical Weapon* they're carrying. If they don't have a weapon they can't attack. Players have two stats which may change during the course of the game:

- **Toughness** How much damage s/he can take before dying.
- **Civilians** The civilian population remaining.

If the players dies (*Toughness* is zero) then the player respawns in the civilian base with no weapons.

If the civilians are wiped out then its game over.

## Screens

- Loading screen
	- Spinner and some sort of message
- Menu screen
	- Start game
	- Instructions
	- Leaderboards ???
- Main game play screen
	- Arena
	- HUD
		- A-bomb timer
		- Player health
		- Player ammo
		- Civilians
		- Bug growth timer
		- Player inventory
			- Current weapon
			- Icons representing bits they've picked up (this can't be too busy!)
- Build bugs screen
	- Choose chemicals (1-3)
	- Bug stats
- Build chemical weapons screen
	- Choose type
	- Choose chemicals (2)
	- Weapon stats

## Graphics

Character sizes should be based on 16x16 pixels as the player and aliens, with 8x8 for the bugs.

- Player
	- Moving animation
- Aliens (3?)
	- Moving animation
- The labs
- Bugs
	- Moving animation
- Pick ups (these could just be a simple icon with differing colours)
	- Weapon types x3
	- Chemicals
- Walls
- Random background stuff
- Entry points for the aliens

## Sound Effects

- Aliens
	- General background noise when they're on the screen
	- Attacking
- Player
	- Pick up
	- Moving
	- Firing
- Civilians screaming
- Bugs
	- Moving
	- Attacking

## Music

Should be something war like with drums.

## Nice to haves

### Co-operative Multi-player

This would be awesome as a coop multi-player using Firebase but that may not be possible.

### Leaderboards

Enter your name and your score is stored on a Firebase leader board.

### Achievements

Get notifications for various activities (creating stuff, wiping out xx amount of enemies).