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
                'description' => 'Severe content involving non-consensual sexual acts, extreme coercion, and forced exploitation.',
                'contents' => [
                    ['name' => 'Rape / Attempted Rape',      'importance' => 100, 'description' => 'Nonconsensual sexual assault, shown or heavily implied.'],
                    ['name' => 'Sexual Coercion',            'importance' => 95,  'description' => 'Sexual acts forced through blackmail, threats, or pressure.'],
                    ['name' => 'Tentacle Assault',           'importance' => 90,  'description' => 'Assault or sexual framing involving monsters or tentacles.'],
                    ['name' => 'Sexual Slavery',             'importance' => 85,  'description' => 'Characters owned, traded, or controlled for sexual exploitation.'],
                    ['name' => 'Groping / Molestation',      'importance' => 75,  'description' => 'Unwanted sexual touching or harassment, often in public.'],
                    ['name' => 'Drug-Facilitated Assault',   'importance' => 70,  'description' => 'Use of aphrodisiacs or drugs to bypass consent.'],
                    ['name' => 'Forced Nudity',              'importance' => 65,  'description' => 'Public humiliation involving being stripped against one\'s will.'],
                ],
            ],
            [
                'name' => 'Taboos & Controversial Dynamics',
                'importance' => 95,
                'description' => 'Highly controversial relationship dynamics and anime tropes that viewers frequently want to avoid.',
                'contents' => [
                    ['name' => 'NTR (Netorare)',             'importance' => 100, 'description' => 'Severe romantic betrayal, cheating, or having a partner taken away.'],
                    ['name' => 'Incest / Pseudo-incest',     'importance' => 95,  'description' => 'Sexual or romantic tension between blood or step relatives.'],
                    ['name' => 'Loli / Shota Framing',       'importance' => 90,  'description' => 'Sexualized framing or portrayal of young looking children.'],
                    ['name' => 'Mind Control / Brainwashing', 'importance' => 88,  'description' => 'Loss of bodily or mental autonomy via hypnosis, magic, or drugs.'],
                    ['name' => 'Age Gap Romance',            'importance' => 85,  'description' => 'Romance involving a severe age disparity, often involving minors.'],
                    ['name' => 'Teacher-Student Romance',    'importance' => 80,  'description' => 'Romantic tension or relations between school staff and a student.'],
                    ['name' => 'Master-Servant Romance',     'importance' => 75,  'description' => 'Romance involving extreme power imbalances or ownership.'],
                    ['name' => 'Stalking',                   'importance' => 65,  'description' => 'Obsessive pursuit, surveillance, or invasion of privacy.'],
                ],
            ],
            [
                'name' => 'Extreme Gore & Body Horror',
                'importance' => 90,
                'description' => 'Graphic, highly detailed violence, severe bodily trauma, and disturbing physical transformations.',
                'contents' => [
                    ['name' => 'Graphic Dismemberment',      'importance' => 100, 'description' => 'Graphic severing of limbs, heads, and heavy bloodshed.'],
                    ['name' => 'Torture',                    'importance' => 95,  'description' => 'Prolonged, graphic physical or psychological torture scenes.'],
                    ['name' => 'Body Horror',                'importance' => 90,  'description' => 'Disturbing physical mutations, flesh corruption, or forced transformations.'],
                    ['name' => 'Eye Trauma',                 'importance' => 88,  'description' => 'Graphic injury specifically involving the eyes (stabbing, gouging, or bleeding).'],
                    ['name' => 'Cannibalism',                'importance' => 85,  'description' => 'Depiction of characters consuming human or humanoid flesh.'],
                    ['name' => 'Graphic Vomiting',           'importance' => 80,  'description' => 'Detailed, onscreen vomiting (Emetophobia warning).'],
                ],
            ],
            [
                'name' => 'Psychological Trauma & Abuse',
                'importance' => 88,
                'description' => 'Severe emotional distress, child victimization, and depictions of manipulation or self-inflicted harm.',
                'contents' => [
                    ['name' => 'Suicide',                    'importance' => 100, 'description' => 'Suicide, suicide attempts, or explicit suicidal ideation.'],
                    ['name' => 'Child Abuse',                'importance' => 95,  'description' => 'Physical abuse, severe neglect, or cruelty toward children.'],
                    ['name' => 'Grooming',                   'importance' => 90,  'description' => 'Predatory dynamics or manipulating someone into a relationship via trust.'],
                    ['name' => 'Self-Harm',                  'importance' => 85,  'description' => 'Deliberate physical injury to oneself (e.g., cutting, scratching).'],
                    ['name' => 'Domestic Abuse',             'importance' => 80,  'description' => 'Physical or extreme emotional abuse within a household or relationship.'],
                    ['name' => 'Gaslighting',                'importance' => 75,  'description' => 'Manipulating someone into questioning their own sanity or reality.'],
                    ['name' => 'Religious / Cult Trauma',    'importance' => 70,  'description' => 'Abuse or trauma stemming from cults or corrupt religious organizations.'],
                    ['name' => 'PTSD / Trauma Flashbacks',   'importance' => 70,  'description' => 'Characters vividly reliving or suffering from severe past trauma.'],
                    ['name' => 'Panic Attacks',              'importance' => 65,  'description' => 'Onscreen depictions of severe, prolonged anxiety or hyperventilation.'],
                ],
            ],
            [
                'name' => 'Animal Welfare',
                'importance' => 85,
                'description' => 'Content involving harm, experimentation, or cruelty specifically directed at animals or pets.',
                'contents' => [
                    ['name' => 'Animal Cruelty',             'importance' => 100, 'description' => 'Deliberate harm, torture, or abuse of animals.'],
                    ['name' => 'Pet / Animal Death',         'importance' => 95,  'description' => 'Onscreen death of a dog, cat, or companion animal.'],
                    ['name' => 'Biological Experimentation', 'importance' => 90,  'description' => 'Unethical scientific testing or fusion involving animals and humans.'],
                ],
            ],
            [
                'name' => 'Major Phobias & Sensory',
                'importance' => 80,
                'description' => 'Visual or thematic triggers that cause severe physical reactions, phobias, or seizure risks.',
                'contents' => [
                    ['name' => 'Flashing Lights',            'importance' => 100, 'description' => 'Rapid strobe effects or intense flashes that risk triggering seizures.'],
                    ['name' => 'Trypophobia',                'importance' => 90,  'description' => 'Disturbing imagery involving dense clusters of small holes.'],
                    ['name' => 'Swarm / Bug Horror',         'importance' => 85,  'description' => 'Massive swarms of insects or parasites (Entomophobia warning).'],
                    ['name' => 'Asphyxiation',               'importance' => 80,  'description' => 'Graphic choking, strangulation, or drowning.'],
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
