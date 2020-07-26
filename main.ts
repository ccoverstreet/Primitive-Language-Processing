const dictionary: any = {
	"hey": [1, 0, 0, 0, 0],
	"hello": [1, 0, 0, 0, 0],
	"hi": [1, 0, 0, 0, 0],
	"bye": [0, 1, 0, 0, 0],
	"cya": [0, 1, 0, 0, 0],
	"turn": [0, 0, 1, 0, 0],
	"switch": [0, 0, 1, 0, 0],
	"on": [0, 0, 0, 1, 0],
	"activate": [0, 0, 0, 1, 0],
	"off": [0, 0, 0, 0, 1]
}

function greeting() {
	return "Hello to you!";
}

function farewell() {
	return "Goodbye!";
}

function turn_on_lights() {
	return "I have turned on the lights!";
}

const actions: any = [
	{
		"name": "greeting",
		"activation": [1, 0, 0, 0, 0],
		"function": greeting
	},
	{
		"name": "farewell",
		"activation": [0, 1, 0, 0, 0],
		"function": farewell
	},
	{
		"name": "turn_on_lights",
		"activation": [0, 0, 1, 1, 0],
		"function": turn_on_lights
	}
]

function parse_activation_phrase(actions: any) {
	for (var i = 0; i < actions.length; i++) {
		
	}
}

function add_vector(intent_vector: any, word_vector: any) {
	if (word_vector != undefined) {
		for (var i = 0; i < intent_vector.length; i++) {
			intent_vector[i] += word_vector[i];
		}
	}
}

function normalize_vector(vector: any) {
	var sum = 0;
	for (var i = 0; i < vector.length; i++) {
		sum += vector[i];
	}

	const magnitude = sum ** (1/2);
	var new_vector = [];
	for (var i = 0; i < vector.length; i++) {
		new_vector.push(vector[i] / magnitude);
	}

	return new_vector;
}

function determine_action(intent_vector: any) {
	var required_actions = [];

	for (var i = 0; i < actions.length; i++) {
		console.log("Checking Action");
		var abs_diff = 0;
		var should_continue = false;
		for (var j = 0; j < intent_vector.length; j++) {
			abs_diff += Math.abs(intent_vector[j] - actions[i].activation[j]);
			console.log(intent_vector[j], actions[i].activation[j]);
			if (intent_vector[j] < actions[i].activation[j]) {
				should_continue = true;
				break;
			}
		}

		if (should_continue) {
			continue;
		}

		console.log("FART");
		
		if (abs_diff < 10) {
			required_actions.push(i);
		}
	}

	console.log(required_actions);
	return required_actions;
}

function execute_actions(action_list: any) {
	var response_string = "";
	for (var i = 0; i < action_list.length; i++) {
		response_string += actions[action_list[i]].function() + " ";
	}

	return response_string;
}


async function determine_intent(str: String) {
	str = await str.toLowerCase();
	str = await str.replace(/[,.;]/, "");
	console.log(str);
	const split_string = await str.split(" ");

	var intent_vector = [0, 0, 0, 0, 0];

	for (var i = 0; i < split_string.length; i++) {
		add_vector(intent_vector, dictionary[split_string[i]])
	}
	console.log(intent_vector);

	const action_list = determine_action(intent_vector);
	const generated_response = execute_actions(action_list);
	console.log(generated_response);
}

await determine_intent("Hello World, turn on light");
console.log();
await determine_intent("Hello, Bye");
console.log()
await determine_intent("Hey jablko, turn on my light");
