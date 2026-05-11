<?php

namespace Database\Seeders;

use App\Models\MasterTrigger;
use App\Models\TriggerContent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class TriggerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $triggers = [
            [
                'name' => 'Sexual violence and coercion',
                'importance' => 100,
                'description' => 'Nonconsensual sexual content, coercion, and sexual abuse.',
                'contents' => [
                    [
                        'name' => 'Rape',
                        'importance' => 100,
                        'description' => 'Any nonconsensual sexual assault, shown or implied.',
                    ],
                    [
                        'name' => 'Attempted rape',
                        'importance' => 95,
                        'description' => 'Failed or interrupted rape attempts.',
                    ],
                    [
                        'name' => 'Sexual coercion',
                        'importance' => 90,
                        'description' => 'Sexual acts forced through threats, manipulation, or pressure.',
                    ],
                    [
                        'name' => 'Sexual blackmail',
                        'importance' => 85,
                        'description' => 'Using threats or leverage to force sexual compliance.',
                    ],
                    [
                        'name' => 'Molestation',
                        'importance' => 80,
                        'description' => 'Unwanted sexual touching or assault.',
                    ],
                    [
                        'name' => 'Sexual slavery',
                        'importance' => 75,
                        'description' => 'Characters being controlled or traded for sexual exploitation.',
                    ],
                    [
                        'name' => 'Forced nudity',
                        'importance' => 70,
                        'description' => 'Being stripped or exposed against one’s will.',
                    ],
                    [
                        'name' => 'Sexual exploitation',
                        'importance' => 65,
                        'description' => 'Abuse or manipulation for sexual gain.',
                    ],
                ],
            ],
            [
                'name' => 'Relationship abuse',
                'importance' => 95,
                'description' => 'Toxic romance, betrayal, grooming, and abusive relationship dynamics.',
                'contents' => [
                    [
                        'name' => 'NTR',
                        'importance' => 100,
                        'description' => 'Partner betrayal, being “taken away,” or romantic cheating drama.',
                    ],
                    [
                        'name' => 'Cheating',
                        'importance' => 95,
                        'description' => 'Infidelity or romantic betrayal.',
                    ],
                    [
                        'name' => 'Grooming',
                        'importance' => 90,
                        'description' => 'Manipulating someone into a relationship through trust abuse or power imbalance.',
                    ],
                    [
                        'name' => 'Age gap romance',
                        'importance' => 85,
                        'description' => 'Romance with a major age imbalance, especially involving minors.',
                    ],
                    [
                        'name' => 'Stalking',
                        'importance' => 80,
                        'description' => 'Following, surveillance, or obsessive pursuit.',
                    ],
                    [
                        'name' => 'Possessive behavior',
                        'importance' => 75,
                        'description' => 'Controlling, jealous, or domineering romance behavior.',
                    ],
                    [
                        'name' => 'Emotional abuse',
                        'importance' => 70,
                        'description' => 'Humiliation, intimidation, shaming, or repeated emotional harm.',
                    ],
                    [
                        'name' => 'Manipulation',
                        'importance' => 65,
                        'description' => 'Gaslighting, coercion, or deceit within relationships.',
                    ],
                ],
            ],
            [
                'name' => 'Gore and physical violence',
                'importance' => 90,
                'description' => 'Graphic injury, bloodshed, torture, and violent physical harm.',
                'contents' => [
                    [
                        'name' => 'Gore',
                        'importance' => 100,
                        'description' => 'Heavy blood and graphic injury detail.',
                    ],
                    [
                        'name' => 'Dismemberment',
                        'importance' => 95,
                        'description' => 'Loss of limbs or body parts.',
                    ],
                    [
                        'name' => 'Decapitation',
                        'importance' => 90,
                        'description' => 'Heads being severed or shown detached.',
                    ],
                    [
                        'name' => 'Torture',
                        'importance' => 85,
                        'description' => 'Physical or psychological torture scenes.',
                    ],
                    [
                        'name' => 'Mutilation',
                        'importance' => 80,
                        'description' => 'Severe body damage or disfigurement.',
                    ],
                    [
                        'name' => 'Severe injury',
                        'importance' => 75,
                        'description' => 'Broken bones, crushed bodies, and serious wounds.',
                    ],
                    [
                        'name' => 'Blood spray',
                        'importance' => 70,
                        'description' => 'Large blood bursts or heavy blood effects.',
                    ],
                    [
                        'name' => 'Graphic violence',
                        'importance' => 65,
                        'description' => 'Violence shown in a detailed or lingering way.',
                    ],
                ],
            ],
            [
                'name' => 'Psychological distress',
                'importance' => 85,
                'description' => 'Mental health themes, trauma, suicidal content, and emotional collapse.',
                'contents' => [
                    [
                        'name' => 'Suicide',
                        'importance' => 100,
                        'description' => 'Suicide, attempts, or explicit suicidal ideation.',
                    ],
                    [
                        'name' => 'Self harm',
                        'importance' => 95,
                        'description' => 'Deliberate injury to oneself.',
                    ],
                    [
                        'name' => 'PTSD',
                        'importance' => 90,
                        'description' => 'Post trauma symptoms, flashbacks, or trauma responses.',
                    ],
                    [
                        'name' => 'Trauma flashbacks',
                        'importance' => 85,
                        'description' => 'Past traumatic events being relived or remembered in detail.',
                    ],
                    [
                        'name' => 'Gaslighting',
                        'importance' => 80,
                        'description' => 'Manipulating someone into doubting their reality.',
                    ],
                    [
                        'name' => 'Hallucinations',
                        'importance' => 75,
                        'description' => 'Seeing or hearing things that are not there.',
                    ],
                    [
                        'name' => 'Brainwashing',
                        'importance' => 70,
                        'description' => 'Mental control, forced belief changes, or coercive conditioning.',
                    ],
                    [
                        'name' => 'Panic attacks',
                        'importance' => 65,
                        'description' => 'Characters experiencing panic or severe anxiety episodes.',
                    ],
                ],
            ],
            [
                'name' => 'Horror and supernatural horror',
                'importance' => 80,
                'description' => 'Supernatural fear, occult content, transformation horror, and dread.',
                'contents' => [
                    [
                        'name' => 'Possession',
                        'importance' => 100,
                        'description' => 'Demons, spirits, parasites, or other forces controlling a body.',
                    ],
                    [
                        'name' => 'Exorcism',
                        'importance' => 95,
                        'description' => 'Rituals or scenes involving supernatural removal or purification.',
                    ],
                    [
                        'name' => 'Curses',
                        'importance' => 90,
                        'description' => 'Supernatural punishment, bad luck, or cursed objects and people.',
                    ],
                    [
                        'name' => 'Ghosts',
                        'importance' => 85,
                        'description' => 'Spirit apparitions or haunting entities.',
                    ],
                    [
                        'name' => 'Hauntings',
                        'importance' => 80,
                        'description' => 'Locations or characters being haunted.',
                    ],
                    [
                        'name' => 'Body horror',
                        'importance' => 75,
                        'description' => 'Disturbing physical transformation or bodily corruption.',
                    ],
                    [
                        'name' => 'Transformation horror',
                        'importance' => 70,
                        'description' => 'People changing into monsters or losing human form.',
                    ],
                    [
                        'name' => 'Occult rituals',
                        'importance' => 65,
                        'description' => 'Summoning, sacrifice, and dark ritual content.',
                    ],
                ],
            ],
            [
                'name' => 'Abuse and exploitation',
                'importance' => 78,
                'description' => 'Physical, emotional, and systemic abuse, plus captivity and exploitation.',
                'contents' => [
                    [
                        'name' => 'Child abuse',
                        'importance' => 100,
                        'description' => 'Abuse, neglect, or exploitation of children.',
                    ],
                    [
                        'name' => 'Domestic abuse',
                        'importance' => 95,
                        'description' => 'Abuse within families or home relationships.',
                    ],
                    [
                        'name' => 'Slavery',
                        'importance' => 90,
                        'description' => 'Forced labor, ownership, or servitude.',
                    ],
                    [
                        'name' => 'Trafficking',
                        'importance' => 85,
                        'description' => 'Human trafficking, forced transport, or sale of people.',
                    ],
                    [
                        'name' => 'Imprisonment',
                        'importance' => 80,
                        'description' => 'Being locked up or detained against one’s will.',
                    ],
                    [
                        'name' => 'Captivity',
                        'importance' => 75,
                        'description' => 'Kidnapping, hostage situations, or forced confinement.',
                    ],
                    [
                        'name' => 'Bullying',
                        'importance' => 70,
                        'description' => 'Harassment, humiliation, exclusion, or repeated cruelty.',
                    ],
                    [
                        'name' => 'Power abuse',
                        'importance' => 65,
                        'description' => 'Abuse of authority, rank, or social control.',
                    ],
                ],
            ],
            [
                'name' => 'Sexual content and fanservice',
                'importance' => 75,
                'description' => 'Nudity, sexual jokes, fanservice, fetish framing, and ecchi content.',
                'contents' => [
                    [
                        'name' => 'Nudity',
                        'importance' => 100,
                        'description' => 'Full or partial nudity.',
                    ],
                    [
                        'name' => 'Explicit sex',
                        'importance' => 95,
                        'description' => 'Onscreen sex or clearly shown sexual activity.',
                    ],
                    [
                        'name' => 'Fanservice',
                        'importance' => 90,
                        'description' => 'Sexualized camera work or unnecessary body focus.',
                    ],
                    [
                        'name' => 'Sexual jokes',
                        'importance' => 85,
                        'description' => 'Jokes built around sexual content or harassment.',
                    ],
                    [
                        'name' => 'Fetish content',
                        'importance' => 80,
                        'description' => 'Material framed around fetish themes or kinks.',
                    ],
                    [
                        'name' => 'Voyeurism',
                        'importance' => 75,
                        'description' => 'Watching, spying, or peeping for sexual purposes.',
                    ],
                    [
                        'name' => 'Underwear shots',
                        'importance' => 70,
                        'description' => 'Camera framing focused on underwear or upskirt shots.',
                    ],
                    [
                        'name' => 'Sexualized minors',
                        'importance' => 100,
                        'description' => 'Sexual framing involving underage characters.',
                    ],
                ],
            ],
            [
                'name' => 'Death and grief',
                'importance' => 72,
                'description' => 'Death, loss, mourning, and large scale tragedy.',
                'contents' => [
                    [
                        'name' => 'Character death',
                        'importance' => 100,
                        'description' => 'Major or minor character deaths.',
                    ],
                    [
                        'name' => 'Child death',
                        'importance' => 95,
                        'description' => 'Death of a child or child victimization.',
                    ],
                    [
                        'name' => 'Parental death',
                        'importance' => 90,
                        'description' => 'Death of a parent or parent figure.',
                    ],
                    [
                        'name' => 'Grief',
                        'importance' => 85,
                        'description' => 'Mourning, loss, and survivor sadness.',
                    ],
                    [
                        'name' => 'Survivor guilt',
                        'importance' => 80,
                        'description' => 'Characters blaming themselves for surviving tragedy.',
                    ],
                    [
                        'name' => 'Massacre',
                        'importance' => 75,
                        'description' => 'Mass killing or large scale slaughter.',
                    ],
                    [
                        'name' => 'Genocide',
                        'importance' => 70,
                        'description' => 'Attempted or completed extermination of a group.',
                    ],
                    [
                        'name' => 'Funeral scenes',
                        'importance' => 65,
                        'description' => 'Funeral, burial, or memorial content.',
                    ],
                ],
            ],
            [
                'name' => 'Body and medical content',
                'importance' => 68,
                'description' => 'Medical procedures, bodily fluids, pregnancy, infection, and body change.',
                'contents' => [
                    [
                        'name' => 'Surgery',
                        'importance' => 100,
                        'description' => 'Operations or surgical procedures.',
                    ],
                    [
                        'name' => 'Injections',
                        'importance' => 95,
                        'description' => 'Needles, shots, or forced injections.',
                    ],
                    [
                        'name' => 'Disease',
                        'importance' => 90,
                        'description' => 'Illness, illness progression, or disease focus.',
                    ],
                    [
                        'name' => 'Infection',
                        'importance' => 85,
                        'description' => 'Contagion, parasites, or bodily infection.',
                    ],
                    [
                        'name' => 'Vomit',
                        'importance' => 80,
                        'description' => 'Vomiting or vomit related scenes.',
                    ],
                    [
                        'name' => 'Bodily fluids',
                        'importance' => 75,
                        'description' => 'Blood, mucus, saliva, or other fluid heavy content.',
                    ],
                    [
                        'name' => 'Pregnancy',
                        'importance' => 70,
                        'description' => 'Pregnancy or pregnancy related themes.',
                    ],
                    [
                        'name' => 'Childbirth',
                        'importance' => 65,
                        'description' => 'Labor, delivery, or birth scenes.',
                    ],
                ],
            ],
            [
                'name' => 'Discrimination and identity hostility',
                'importance' => 65,
                'description' => 'Prejudice, hateful language, and identity based hostility.',
                'contents' => [
                    [
                        'name' => 'Racism',
                        'importance' => 100,
                        'description' => 'Racial prejudice, discrimination, or racist abuse.',
                    ],
                    [
                        'name' => 'Species discrimination',
                        'importance' => 95,
                        'description' => 'Fantasy or sci fi prejudice based on species or race analogues.',
                    ],
                    [
                        'name' => 'Slurs',
                        'importance' => 90,
                        'description' => 'Hateful or degrading language.',
                    ],
                    [
                        'name' => 'Transphobic framing',
                        'importance' => 85,
                        'description' => 'Mockery, hostility, or negative framing toward trans people or gender nonconforming characters.',
                    ],
                    [
                        'name' => 'Misgendering',
                        'importance' => 80,
                        'description' => 'Characters being referred to with the wrong gender terms on purpose or for ridicule.',
                    ],
                    [
                        'name' => 'Homophobic content',
                        'importance' => 75,
                        'description' => 'Hostility or mockery aimed at queer characters or relationships.',
                    ],
                    [
                        'name' => 'Hate speech',
                        'importance' => 70,
                        'description' => 'Explicit hateful or dehumanizing dialogue.',
                    ],
                    [
                        'name' => 'Prejudice',
                        'importance' => 65,
                        'description' => 'General bias, segregation, or discriminatory treatment.',
                    ],
                ],
            ],
            [
                'name' => 'Substance use and altered state',
                'importance' => 60,
                'description' => 'Alcohol, drugs, intoxication, and altered mental state content.',
                'contents' => [
                    [
                        'name' => 'Alcohol abuse',
                        'importance' => 100,
                        'description' => 'Heavy drinking, dependency, or alcohol misuse.',
                    ],
                    [
                        'name' => 'Drug use',
                        'importance' => 95,
                        'description' => 'Recreational drug use or drug related scenes.',
                    ],
                    [
                        'name' => 'Smoking',
                        'importance' => 90,
                        'description' => 'Cigarettes, cigars, or frequent smoking imagery.',
                    ],
                    [
                        'name' => 'Overdose',
                        'importance' => 85,
                        'description' => 'Drug or substance overdose scenes.',
                    ],
                    [
                        'name' => 'Forced drugging',
                        'importance' => 80,
                        'description' => 'Characters being drugged against their will.',
                    ],
                    [
                        'name' => 'Intoxication',
                        'importance' => 75,
                        'description' => 'Drunken or drugged behavior and impairment.',
                    ],
                    [
                        'name' => 'Dissociation',
                        'importance' => 70,
                        'description' => 'Detached, unreal, or dissociative altered state scenes.',
                    ],
                    [
                        'name' => 'Hallucinatory drug effects',
                        'importance' => 65,
                        'description' => 'Visual or mental distortions caused by substances.',
                    ],
                ],
            ],
        ];

        Model::unguarded(function () use ($triggers) {
            foreach ($triggers as $trigger) {
                $master = MasterTrigger::updateOrCreate(
                    ['name' => $trigger['name']],
                    [
                        'importance' => $trigger['importance'],
                        'description' => $trigger['description'],
                    ]
                );

                foreach ($trigger['contents'] as $content) {
                    TriggerContent::updateOrCreate(
                        [
                            'trigger_id' => $master->id,
                            'name' => $content['name'],
                        ],
                        [
                            'importance' => $content['importance'],
                            'description' => $content['description'],
                        ]
                    );
                }
            }
        });
    }
}
