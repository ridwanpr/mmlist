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
                'description' => 'Highly controversial relationship dynamics and anime tropes.',
                'contents' => [
                    ['name' => 'NTR (Netorare) / Infidelity',    'importance' => 100, 'description' => 'Severe romantic betrayal, cheating, or having a partner taken away.'],
                    ['name' => 'Incest / Pseudo-incest',         'importance' => 95,  'description' => 'Sexual or romantic tension between blood or step relatives.'],
                    ['name' => 'Questionable Age Dynamics',      'importance' => 90,  'description' => 'Loli/Shota framing, or romance involving a severe age disparity.'],
                    ['name' => 'Mind Control & Autonomy Loss',   'importance' => 88,  'description' => 'Brainwashing, hypnosis, or forced physical conditions like forced pregnancy.'],
                    ['name' => 'Power Imbalance Romance',        'importance' => 80,  'description' => 'Romance between unequal parties (teacher/student, master/servant).'],
                ],
            ],
            [
                'name' => 'Extreme Gore & Body Horror',
                'importance' => 90,
                'description' => 'Graphic violence, bodily trauma, and disturbing physical transformations.',
                'contents' => [
                    ['name' => 'Graphic Mutilation & Torture',   'importance' => 100, 'description' => 'Dismemberment, eye trauma, heavy bloodshed, or prolonged torture.'],
                    ['name' => 'Body Horror & Mutation',         'importance' => 90,  'description' => 'Disturbing physical mutations, flesh corruption, or forced transformations.'],
                    ['name' => 'Cannibalism',                    'importance' => 85,  'description' => 'Depiction of characters consuming human or humanoid flesh.'],
                    ['name' => 'Graphic Vomiting',               'importance' => 80,  'description' => 'Detailed, onscreen vomiting.'],
                ],
            ],
            [
                'name' => 'Psychological Trauma & Abuse',
                'importance' => 88,
                'description' => 'Severe emotional distress, victimization, and manipulation.',
                'contents' => [
                    ['name' => 'Suicide & Self-Harm',            'importance' => 100, 'description' => 'Suicide, suicide attempts, cutting, or explicit thoughts of self-harm.'],
                    ['name' => 'Child Abuse & Grooming',         'importance' => 95,  'description' => 'Physical abuse, severe neglect, or predatory grooming of minors.'],
                    ['name' => 'Severe Bullying / Ijime',        'importance' => 90,  'description' => 'Intense, prolonged peer abuse, ostracization, or school bullying.'],
                    ['name' => 'Domestic Abuse & Manipulation',  'importance' => 85,  'description' => 'Household abuse, severe gaslighting, or obsessive stalking.'],
                    ['name' => 'Terminal Illness / Death',       'importance' => 70,  'description' => 'Slow, painful decline or tragic death from incurable disease.'],
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
                ],
            ],
            [
                'name' => 'Frustrating Lead Traits',
                'importance' => 70,
                'description' => 'Subjective but highly avoided character archetypes and writing tropes.',
                'contents' => [
                    ['name' => 'Spineless / Doormat Lead',       'importance' => 90,  'description' => 'Protagonist is cowardly, lacks agency, or endlessly forgives abusers.'],
                    ['name' => 'Promiscuous / Unfaithful Lead',  'importance' => 85,  'description' => 'Main character or heroine casually sleeps around or acts unfaithfully.'],
                    ['name' => 'Dense / Oblivious MC',           'importance' => 80,  'description' => 'Protagonist is frustratingly blind to obvious romantic advances or plot points.'],
                    ['name' => 'Toxic / Yandere Love Interest',  'importance' => 75,  'description' => 'Main love interest is obsessively jealous, toxic, or violently possessive.'],
                    ['name' => 'Edgelord / Tryhard Dark MC',     'importance' => 60,  'description' => 'Protagonist is overly cynical, excessively cruel, or artificially dark.'],
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
