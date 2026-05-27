<?php

namespace Database\Seeders;

use App\Models\MasterTrigger;
use App\Models\TriggerContent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TriggerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $triggers = [
            [
                'name' => 'Sexual Violence & Non-Consent',
                'importance' => 100,
                'description' => 'Severe content involving non-consensual acts, coercion, and exploitation.',
                'contents' => [
                    ['name' => 'Rape, Assault & Coercion',       'importance' => 100, 'description' => 'Nonconsensual sexual assault, blackmail, or drug-facilitated acts.'],
                    ['name' => 'Tentacle / Monster Assault',     'importance' => 90,  'description' => 'Assault or sexual framing specifically involving monsters or tentacles.'],
                    ['name' => 'Sexual Slavery',                 'importance' => 85,  'description' => 'Characters owned, traded, or controlled for sexual exploitation.'],
                    ['name' => 'Harassment & Public Humiliation', 'importance' => 75,  'description' => 'Unwanted groping, molestation, or being stripped against one\'s will.'],
                ],
            ],
            [
                'name' => 'Taboos & Controversial Dynamics',
                'importance' => 95,
                'description' => 'Highly controversial relationship or behavioral dynamics.',
                'contents' => [
                    ['name' => 'NTR (Netorare) / Infidelity',    'importance' => 100, 'description' => 'Severe romantic betrayal, cheating, or having a partner taken away.'],
                    ['name' => 'Incest / Pseudo-incest',         'importance' => 95,  'description' => 'Sexual or romantic tension between blood or step relatives.'],
                    ['name' => 'Mind Break',                     'importance' => 92,  'description' => 'A character\'s psyche, sanity, or personality is completely shattered through prolonged trauma or despair.'],
                    ['name' => 'Questionable Age Dynamics',      'importance' => 90,  'description' => 'Loli/Shota framing, or romance involving a severe age disparity.'],
                    ['name' => 'Mind Control & Autonomy Loss',   'importance' => 88,  'description' => 'Brainwashing, hypnosis, or forced physical conditions like forced pregnancy.'],
                    ['name' => 'Non-Sexual Slavery / Slave-Owning MC', 'importance' => 85, 'description' => 'The protagonist buys, owns, or keeps slaves.'],
                    ['name' => 'Power Imbalance Romance',        'importance' => 80,  'description' => 'Romance between unequal parties (teacher/student, master/servant).'],
                ],
            ],
            [
                'name' => 'Extreme Gore & Body Horror',
                'importance' => 90,
                'description' => 'Graphic violence, bodily trauma, and disturbing physical transformations.',
                'contents' => [
                    ['name' => 'Graphic Mutilation & Torture',   'importance' => 100, 'description' => 'Dismemberment, eye trauma, heavy bloodshed, or prolonged torture.'],
                    ['name' => 'Pregnancy Loss / Infant Death',  'importance' => 95,  'description' => 'Depictions of miscarriages, stillbirths, or the tragic deaths of infants and newborns.'],
                    ['name' => 'Body Horror & Mutation',         'importance' => 90,  'description' => 'Disturbing physical mutations, flesh corruption, or forced transformations.'],
                    ['name' => 'Eaten Alive',                    'importance' => 88,  'description' => 'Characters being swallowed whole, chewed, or consumed alive by monsters, titans, or demons.'],
                    ['name' => 'Cannibalism',                    'importance' => 85,  'description' => 'Depiction of characters consuming human or humanoid flesh.'],
                    ['name' => 'Graphic Vomiting',               'importance' => 80,  'description' => 'Detailed, onscreen vomiting.'],
                    ['name' => 'Severed Bodies',                  'importance' => 96,  'description' => 'Severe fight injuries, torn limbs, and bodies ripped apart.'],
                ],
            ],
            [
                'name' => 'Psychological Trauma & Abuse',
                'importance' => 88,
                'description' => 'Severe emotional distress, victimization, and manipulation.',
                'contents' => [
                    ['name' => 'Suicide & Self-Harm',            'importance' => 100, 'description' => 'Suicide, suicide attempts, cutting, or explicit thoughts of self-harm.'],
                    ['name' => 'Child Abuse & Grooming',         'importance' => 95,  'description' => 'Physical abuse, severe neglect, or predatory grooming of minors.'],
                    ['name' => 'Severe Bullying',                'importance' => 90,  'description' => 'Intense, prolonged peer abuse, ostracization, or school bullying.'],
                    ['name' => 'Domestic Abuse & Manipulation',  'importance' => 85,  'description' => 'Household abuse, severe gaslighting, or obsessive stalking.'],
                    ['name' => 'Discrimination & Prejudice',     'importance' => 75,  'description' => 'Abuse, marginalization, or slurs based on race, origin, or fantasy species (e.g., demi-humans, mages).'],
                    ['name' => 'Terminal Illness / Death',       'importance' => 70,  'description' => 'Slow, painful decline or tragic death from incurable disease.'],
                    ['name' => 'Family Dysfunction / Broken Home', 'importance' => 70, 'description' => 'Severe parental abandonment, bitter divorce trauma, toxic sibling rivalries, or parental estrangement.'],
                ],
            ],
            [
                'name' => 'Animal Welfare & Severe Phobias',
                'importance' => 85,
                'description' => 'Content involving harm to animals, seizure risks, and intense phobia triggers.',
                'contents' => [
                    ['name' => 'Animal Cruelty & Death',         'importance' => 100, 'description' => 'Deliberate harm, death, or unethical experimentation on animals.'],
                    ['name' => 'Flashing Lights / Epilepsy',     'importance' => 100, 'description' => 'Rapid strobe effects or intense flashes that risk triggering seizures.'],
                    ['name' => 'Common Visual Phobias',          'importance' => 85,  'description' => 'Clusters of holes (Trypophobia) or massive swarms of bugs/parasites.'],
                    ['name' => 'Asphyxiation & Confinement',     'importance' => 80,  'description' => 'Graphic choking, drowning, or being trapped in extremely confined spaces.'],
                    ['name' => 'Needles & Medical Trauma',       'importance' => 75,  'description' => 'Graphic injections, forced clinical experimentation, or intense focus on medical tools.'],
                    ['name' => 'Drowning & Deep Water',          'importance' => 70,  'description' => 'Terrifying underwater sequences, suffocating near-drowning experiences, or open ocean horror.'],
                ],
            ],
            [
                'name' => 'Frustrating Lead Traits',
                'importance' => 70,
                'description' => 'Polarizing character archetypes and behavioral traits.',
                'contents' => [
                    ['name' => 'Spineless / Doormat Lead',       'importance' => 90,  'description' => 'Protagonist is cowardly, lacks agency, or endlessly forgives abusers.'],
                    ['name' => 'Promiscuous / Unfaithful Lead',  'importance' => 85,  'description' => 'Main character or heroine casually sleeps around or acts unfaithfully.'],
                    ['name' => 'Dense / Oblivious MC',           'importance' => 80,  'description' => 'Protagonist is frustratingly blind to obvious romantic advances or plot points.'],
                    ['name' => 'Toxic / Yandere Love Interest',  'importance' => 75,  'description' => 'Main love interest is obsessively jealous, toxic, or violently possessive.'],
                    ['name' => 'Edgelord / Tryhard Dark MC',     'importance' => 60,  'description' => 'Protagonist is overly cynical, excessively cruel, or artificially dark.'],
                ],
            ],
            [
                'name' => 'Supernatural, Cults & Existential Dread',
                'importance' => 82,
                'description' => 'Themes involving psychological breakdown due to cosmic elements, cult control, or supernatural violations.',
                'contents' => [
                    ['name' => 'Cults & Religious Manipulation',      'importance' => 85, 'description' => 'Fictional or real-world religious groups exploiting, brainwashing, or sacrificing members.'],
                    ['name' => 'Existential Dread & Reality Collapse', 'importance' => 80, 'description' => 'Characters discovering their reality is fake, cosmic horror elements, or impending universal erasure.'],
                    ['name' => 'Demonic Possession & Host Takeover',  'importance' => 78, 'description' => 'Malicious spirits, entities, or demons taking over a host body against their will.'],
                ],
            ],
            [
                'name' => 'Substance Abuse & Addiction',
                'importance' => 75,
                'description' => 'Depictions of chemical dependency, alcoholism, and illicit drug use.',
                'contents' => [
                    ['name' => 'Severe Drug Abuse & Withdrawal', 'importance' => 85, 'description' => 'Graphic depictions of illicit substance use, chemical dependency, or overdose symptoms.'],
                    ['name' => 'Alcoholism & Intoxication Gags', 'importance' => 65, 'description' => 'Characters struggling with chronic alcohol abuse or predatory framing during heavy intoxication.'],
                ],
            ],
            [
                'name' => 'Narrative / Ending Frustrations',
                'importance' => 65,
                'description' => 'Divisive plot developments or controversial series conclusions.',
                'contents' => [
                    ['name' => 'Tragic / Depressing Ending',      'importance' => 80, 'description' => 'The story concludes with the primary cast dying, failing, or entering permanent misery.'],
                    ['name' => 'Amnesia / Plot Progress Reset',   'importance' => 75, 'description' => 'Characters lose their memories, completely erasing established character growth or romantic progress.'],
                    ['name' => 'Unresolved Cliffhanger / Axed',   'importance' => 70, 'description' => 'The project ends abruptly without wrapping up major plot lines, offering zero narrative closure.'],
                    ['name' => 'Inappropriate Fanservice',        'importance' => 65, 'description' => 'Highly sexualized camera angles, clothing tears, or pervert gags.'],
                    ['name' => 'Bait-and-Switch Romance',         'importance' => 65, 'description' => 'The narrative builds up a specific romantic pairing over a long duration only to switch to another pairing unexpectedly.'],
                    ['name' => 'Queerbaiting / Relationship Bait', 'importance' => 60, 'description' => 'Intentionally teasing non-heteronormative romantic dynamics for marketing without ever intending to make it canon.'],
                    ['name' => 'Sudden Harem Pivot',              'importance' => 55, 'description' => 'A narrative that shifts focus unexpectedly to surrounding the lead character with multiple love interests.'],
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
                            'slug' => Str::slug($content['name']),
                        ]
                    );
                }
            }
        });
    }
}
