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
                    ['name' => 'Forced Gender Bending',      'importance' => 80,  'description' => 'Forced physical sex change against a character\'s will.'],
                    ['name' => 'Voyeurism / Peeping',        'importance' => 75,  'description' => 'Non-consensual watching, spying, or recording for sexual purposes.'],
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
                    ['name' => 'Age Gap Romance',            'importance' => 85,  'description' => 'Romance involving a severe age disparity, often involving minors.'],
                    ['name' => 'Teacher-Student Romance',    'importance' => 80,  'description' => 'Romantic tension or relations between school staff and a student.'],
                    ['name' => 'Ugly Bastard Trope',         'importance' => 75,  'description' => 'Predatory visual tropes involving extreme power imbalances.'],
                ],
            ],
            [
                'name' => 'Extreme Gore & Body Horror',
                'importance' => 90,
                'description' => 'Graphic, highly detailed violence, severe bodily trauma, and disturbing physical transformations.',
                'contents' => [
                    ['name' => 'Dismemberment',              'importance' => 100, 'description' => 'Graphic severing of limbs, heads, or body parts.'],
                    ['name' => 'Torture',                    'importance' => 95,  'description' => 'Prolonged, graphic physical or psychological torture scenes.'],
                    ['name' => 'Body Horror',                'importance' => 90,  'description' => 'Disturbing physical mutations, flesh corruption, or monster transformations.'],
                    ['name' => 'Eye Trauma',                 'importance' => 85,  'description' => 'Graphic injury, removal, or destruction of eyes.'],
                    ['name' => 'Graphic Vomiting',           'importance' => 80,  'description' => 'Detailed, onscreen vomiting (Emetophobia warning).'],
                    ['name' => 'Heavy Bloodshed',            'importance' => 75,  'description' => 'Extreme amounts of blood spray and gore without necessarily losing limbs.'],
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
                    ['name' => 'Mind Control',               'importance' => 75,  'description' => 'Total loss of bodily autonomy via hypnosis, magic, or brainwashing.'],
                ],
            ],
            [
                'name' => 'Animal Welfare',
                'importance' => 85,
                'description' => 'Content involving harm, experimentation, or cruelty specifically directed at animals or pets.',
                'contents' => [
                    ['name' => 'Animal Cruelty',             'importance' => 100, 'description' => 'Deliberate harm, torture, or abuse of animals.'],
                    ['name' => 'Pet / Animal Death',         'importance' => 95,  'description' => 'Onscreen death of a dog, cat, or companion animal.'],
                    ['name' => 'Human-Animal Hybridization', 'importance' => 90,  'description' => 'Forced scientific fusion of humans and animals.'],
                    ['name' => 'Animal Experimentation',     'importance' => 85,  'description' => 'Laboratory testing or scientific abuse of animals.'],
                    ['name' => 'Animal Sacrifice',           'importance' => 80,  'description' => 'Killing animals for occult rituals or magic.'],
                    ['name' => 'Hunting / Poaching',         'importance' => 75,  'description' => 'Killing animals for sport or profit.'],
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
                    ['name' => 'Terminal Illness',           'importance' => 75,  'description' => 'Slow physical deterioration and death from disease.'],
                    ['name' => 'Claustrophobia',             'importance' => 70,  'description' => 'Scenes involving being trapped or confined in extremely tight spaces.'],
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
